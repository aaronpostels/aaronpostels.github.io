// Draw-on-my-photo dialog, shared by the home and profile pages. Needs the #doodle markup and button.face triggers.
(() => {
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
/* ---------- draw on my photo ---------- */
{
  const cv = document.getElementById('ddc'), g = cv.getContext('2d'), strokes = [];
  const COLORS = [['#0a0a0a', 'Black'], ['#ffffff', 'White'], ['#e5484d', 'Red'], ['#f5b301', 'Yellow'], ['#1d6b47', 'Green'], ['#2f6fed', 'Blue']];
  let color = COLORS[2][0], size = 10, live = null, frame = 0;
  ddsw.innerHTML = COLORS.map(([c, n]) => `<button type="button" role="radio" aria-checked="${c === color}" aria-label="${n}" data-c="${c}" style="--c:${c}"></button>`).join('');
  const brush = () => {
    const d = size, s = Math.ceil(d) + 4, h = s / 2;
    ddsz.style.setProperty('--d', d + 'px'); ddsz.style.setProperty('--x', (3 + (d - 6) / 22 * 93) + 'px'); ddsz.style.setProperty('--c', color);
    ddsz.setAttribute('aria-valuenow', Math.round(d));
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><circle cx="${h}" cy="${h}" r="${d / 2}" fill="${color}" fill-opacity=".35" stroke="#fff" stroke-width="1.5"/><circle cx="${h}" cy="${h}" r="${d / 2 + .75}" fill="none" stroke="#000" stroke-opacity=".45"/></svg>`;
    cv.style.cursor = `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${h} ${h}, crosshair`;
  };
  ddsw.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; color = b.dataset.c; ddsw.querySelectorAll('button').forEach(x => x.setAttribute('aria-checked', x === b)); brush(); });
  // cone slider: the knob sits where the cone is exactly as thick as the brush
  const setSize = e => { const r = ddsz.getBoundingClientRect(), t = Math.max(0, Math.min(1, (e.clientX - r.left - 3) / 93)); size = 6 + t * 22; brush(); };
  ddsz.addEventListener('pointerdown', e => { try { ddsz.setPointerCapture(e.pointerId); } catch (err) {} setSize(e); ddsz.addEventListener('pointermove', setSize); });
  const endSize = () => ddsz.removeEventListener('pointermove', setSize);
  ddsz.addEventListener('pointerup', endSize); ddsz.addEventListener('pointercancel', endSize);
  ddsz.addEventListener('keydown', e => { const k = { ArrowLeft: -2, ArrowDown: -2, ArrowRight: 2, ArrowUp: 2 }[e.key]; if (!k) return; e.preventDefault(); size = Math.max(6, Math.min(28, Math.round(size) + k)); brush(); });
  brush();
  // points are stored relative to the canvas width, so drawings survive a resize
  const line = (s, g = cv.getContext('2d'), W = cv.width) => {
    const p = s.p;
    g.strokeStyle = s.c; g.lineWidth = s.w * W; g.lineCap = g.lineJoin = 'round';
    g.beginPath(); g.moveTo(p[0][0] * W, p[0][1] * W);
    if (p.length === 1) g.lineTo(p[0][0] * W + .1, p[0][1] * W);
    for (let i = 1; i < p.length; i++) g.lineTo(p[i][0] * W, p[i][1] * W);
    g.stroke();
  };
  const redraw = () => { frame = 0; g.clearRect(0, 0, cv.width, cv.height); strokes.forEach(s => line(s)); if (live) line(live); };
  const fit = () => { const r = cv.getBoundingClientRect(), d = devicePixelRatio || 1; cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d); redraw(); };
  const pt = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.width]; };
  cv.addEventListener('pointerdown', e => { cv.setPointerCapture(e.pointerId); live = { c: color, w: size / cv.getBoundingClientRect().width, p: [pt(e)] }; redraw(); });
  cv.addEventListener('pointermove', e => { if (!live) return; const cs = e.getCoalescedEvents?.(); for (const c of cs?.length ? cs : [e]) live.p.push(pt(c)); if (!frame) frame = requestAnimationFrame(redraw); });
  const end = () => { if (live) { strokes.push(live); live = null; redraw(); save(); paintFaces(); } };
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  const shut = () => {
    if (!doodle.open || doodle.classList.contains('closing')) return;
    doodle.classList.add('closing');
    setTimeout(() => { doodle.classList.remove('closing'); doodle.close(); }, reduce ? 0 : 280);
  };
  ddx.onclick = shut;
  doodle.addEventListener('click', e => { if (e.target === doodle) shut(); });
  doodle.addEventListener('cancel', e => { e.preventDefault(); shut(); });
  // the drawing survives page changes (same tab session) and also paints the photo cursor
  const KEY = 'doodle';
  const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(strokes.map(s => ({ c: s.c, w: +s.w.toFixed(4), p: s.p.map(q => [+q[0].toFixed(4), +q[1].toFixed(4)]) })))); } catch (err) {} };
  const flat = () => { // strokes on a small offscreen canvas with the shape of the photo
    const im = document.querySelector('.dd-pic img'), o = document.createElement('canvas'), W = 256;
    o.width = W; o.height = Math.round(W * (im && im.naturalWidth ? im.naturalHeight / im.naturalWidth : 1));
    const og = o.getContext('2d'); strokes.forEach(s => line(s, og, W)); return o.toDataURL();
  };
  const paintFaces = () => {
    const url = strokes.length ? flat() : '';
    document.querySelectorAll('.face, .pcur .pc').forEach(f => {
      let ink = f.querySelector('.ink');
      if (!url) return ink?.remove();
      if (!ink) { ink = document.createElement('img'); ink.className = 'ink'; ink.alt = ''; f.append(ink); }
      ink.src = url;
    });
  };
  try { const old = JSON.parse(sessionStorage.getItem(KEY) || '[]'); if (Array.isArray(old)) strokes.push(...old.filter(s => s && s.p && s.p.length)); } catch (err) {}
  const im0 = document.querySelector('.dd-pic img');
  if (strokes.length) { if (im0 && !im0.complete) im0.addEventListener('load', paintFaces, { once: true }); paintFaces(); }
  document.querySelectorAll('button.face').forEach(b => b.addEventListener('click', () => { doodle.showModal(); fit(); }));
  addEventListener('resize', () => { if (doodle.open) fit(); });
}
})();
