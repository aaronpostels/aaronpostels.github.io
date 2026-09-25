// Portfolio home page. Project data comes from js/projects.js (global `projects`).
(() => {
const slug = s => s.replace(/\s+/g, '-').toLowerCase();
const byRel = (a, b) => (b.relevance || 0) - (a.relevance || 0);
const year = d => { const m = String(d).match(/(\d{4})(?!.*\d{4})/); return m ? +m[1] : null; };
const fmt = d => /^\d{4}-\d{2}/.test(d) ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' }) : d;
// categories for the sentence filter, detected from name, description, tags and stack
const CATS = {
  Web: /\bweb\b|react|next\.js|javascript|html|css|vite|tailwind|nunjucks|site generator/i,
  '3D': /three\.js|\b3d\b|webgl|glsl|blender|unreal|shader/i,
  Games: /game|jam|minigame|platformer|puzzle|shooter|herding|racer|unity|godot|processing/i,
  Hardware: /esp32|raspberry|arduino|\bled|rfid|hardware|telephone|3d printing|stewart|electronic/i,
  AI: /machine learning|ml-agents|diffusion|reinforcement|pytorch|lora|\bai\b/i,
};
const shape = p => {
  const hay = [p.name, p.description, ...(p.tags || []), ...(p.techStack || [])].join(' ');
  return { name: p.name, desc: p.description, href: p.href || null, doc: p.docHref || null, image: p.image, status: p.status, statusSlug: slug(p.status), date: fmt(p.date), year: year(p.date), devices: p.deviceSupport || [], stack: p.techStack || [], cats: Object.keys(CATS).filter(c => CATS[c].test(hay)) };
};
const list = projects.filter(p => p.type !== 'skill');
const DATA = {
  person: { socials: [
    { name: 'GitHub', url: 'https://github.com/aaronpostels' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aaronpostels' },
    { name: 'Instagram', url: 'https://www.instagram.com/apos.tels/' },
  ] },
  featured: list.filter(p => p.href && p.featured).sort(byRel).map(shape),
  projects: list.filter(p => p.href && !p.featured).sort(byRel).map(shape),
  archive: list.filter(p => !p.href).sort(byRel).map(shape),
};
const ICONS = {
  GitHub: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"/></svg>',
  LinkedIn: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>',
  Instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
};

{ // page script (own block: its projects const shadows the global list)
const {person:P, featured, projects, archive} = DATA, I = ICONS;
const mob = p => p.devices.includes('mobile');
const demos = [...projects.filter(mob), ...projects.filter(p => !mob(p))];
const all = [...featured, ...demos, ...archive];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const car = '<svg class="car" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
const acts = p => `<span class="acts">${p.href ? `<a class="btn p" href="${p.href}">${I.play}Open demo</a>` : ''}${p.doc ? `<a class="btn" href="${p.doc}">${I.doc}${p.href ? 'Docs' : 'Read write-up'}</a>` : ''}</span>`;
const devTag = p => p.href ? (mob(p) ? '<span class="ok">Works on phone</span>' : '<span class="warn">Best on desktop</span>') : '<span>Write-up</span>';
const socials = P.socials.map(s => `<a class="ib" href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}">${I[s.name]}</a>`).join('');
soc.innerHTML = socials; fsoc.innerHTML = P.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}">${I[s.name]}</a>`).join('');

/* ---------- showcase ---------- */
feat.innerHTML = featured.map(p => `<article class="fr">
  <a class="frame" href="${p.href}" aria-label="Open ${p.name}"><img src="${p.image}" alt="" loading="lazy" decoding="async"></a>
  <div class="txt"><h3>${p.name}</h3>
    <div class="st"><i class="${p.statusSlug}"></i><span>${p.status}</span><span>${p.date}</span></div>
    <p>${p.desc}</p>
    <div class="tags">${devTag(p)}${p.stack.slice(0, 3).map(s => `<span>${s}</span>`).join('')}</div>
    ${acts(p)}</div>
</article>`).join('');
const badge = p => p.href ? (mob(p) ? '<span class="tag ok">Works on phone</span>' : '<span class="tag warn">Best on desktop</span>') : '<span class="tag">Write-up</span>';
const card = p => `<article class="card"><a class="im" href="${p.href || p.doc}" tabindex="-1" aria-hidden="true"><img src="${p.image}" alt="" loading="lazy" decoding="async">${badge(p)}</a><div class="b"><div class="h"><h3 class="nm">${p.name}</h3><span class="y">${p.year || ''}</span></div><p>${p.desc}</p></div>${acts(p)}</article>`;
document.getElementById('demos').innerHTML = demos.map(card).join('');
strip.innerHTML = archive.map(card).join('');
dc.textContent = demos.length; mc.textContent = archive.length;
dots.innerHTML = archive.map(() => '<i></i>').join('');
const dotsUpd = () => { const w = strip.firstElementChild.offsetWidth + 12, k = Math.round(strip.scrollLeft / w); [...dots.children].forEach((d, j) => d.classList.toggle('on', j === k)); };
strip.addEventListener('scroll', () => requestAnimationFrame(dotsUpd), { passive: true }); dotsUpd();
// tap a dot, or slide a finger along the dots, to move through the cards
const goTo = k => { const c = strip.children[k]; strip.scrollTo({ left: c.offsetLeft - (strip.clientWidth - c.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' }); };
let dotAt = -1;
const scrub = e => {
  const r = dots.getBoundingClientRect(), k = Math.max(0, Math.min(archive.length - 1, Math.floor((e.clientX - r.left - 16) / (r.width - 32) * archive.length)));
  if (k !== dotAt) { dotAt = k; goTo(k); }
};
dots.addEventListener('pointerdown', e => { try { dots.setPointerCapture(e.pointerId); } catch (err) {} dotAt = -1; scrub(e); dots.addEventListener('pointermove', scrub); });
const endScrub = () => dots.removeEventListener('pointermove', scrub);
dots.addEventListener('pointerup', endScrub); dots.addEventListener('pointercancel', endScrub);

/* ---------- sentence filter (short, even-length words keep the lines steady) ---------- */
const OPTS = {
  what: [
    { k: 'all', t: 'things', f: () => true },
    { k: 'Web', t: 'web apps', f: p => p.cats.includes('Web') },
    { k: 'Games', t: 'games', f: p => p.cats.includes('Games') },
    { k: '3D', t: '3D experiences', f: p => p.cats.includes('3D') },
    { k: 'Hardware', t: 'hardware projects', f: p => p.cats.includes('Hardware') },
    { k: 'AI', t: 'AI tools', f: p => p.cats.includes('AI') },
  ],
  where: [
    { k: 'any', t: 'anywhere', d: 'Everything, including write-ups', f: () => true },
    { k: 'browser', t: 'in your browser', d: 'All live demos', f: p => !!p.href },
    { k: 'phone', t: 'on your phone', d: 'Demos that work on a phone', f: p => p.href && mob(p) },
  ],
};
const cur = { what: OPTS.what[0], where: OPTS.where[0] };
const words = [...document.querySelectorAll('.w')];
words.forEach(b => b.innerHTML = `<span class="lbl">${cur[b.dataset.slot].t}</span>${car}`);
function relabel(slotName) { words.filter(b => b.dataset.slot === slotName).forEach(b => b.querySelector('.lbl').textContent = cur[slotName].t); }
let shown = all.length;
function countTo(n) {
  const from = shown, t0 = performance.now(); shown = n;
  document.querySelectorAll('.nlbl').forEach(e => e.textContent = n === 1 ? 'project' : 'projects');
  const set = v => document.querySelectorAll('.nnum').forEach(e => e.textContent = v);
  if (reduce || from === n) return set(n);
  const step = t => { const k = Math.min(1, (t - t0) / 500); set(Math.round(from + (n - from) * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
function apply() {
  const filtered = cur.what.k !== 'all' || cur.where.k !== 'any';
  const list = all.filter(p => cur.what.f(p) && cur.where.f(p));
  show.hidden = filtered; res.hidden = !filtered;
  if (filtered) rl.innerHTML = list.length ? list.map(card).join('')
    : '<p class="none">Nothing matches that combination yet. Try another word.</p>';
  countTo(list.length);
}

let slot = null;
function openSheet(btn) {
  slot = btn.dataset.slot;
  sheet.innerHTML = OPTS[slot].map(o => {
    const n = all.filter(p => (slot === 'what' ? o.f(p) && cur.where.f(p) : cur.what.f(p) && o.f(p))).length;
    return `<button role="menuitemradio" aria-checked="${o === cur[slot]}" data-k="${o.k}"${n ? '' : ' disabled'}><span>${o.t}${o.d ? `<em>${o.d}</em>` : ''}</span><small>${n}</small></button>`;
  }).join('');
  const r = btn.getBoundingClientRect(), w = sheet.offsetWidth, h = sheet.offsetHeight;
  sheet.style.left = Math.max(16, Math.min(innerWidth - 16 - w, r.left + r.width / 2 - w / 2)) + 'px';
  sheet.style.top = Math.max(16, Math.min(innerHeight - 16 - h, r.bottom + 10)) + 'px';
  sheetY = scrollY;
  sheet.classList.add('open'); scrim.classList.add('open'); btn.setAttribute('aria-expanded', true);
  sheet.querySelector('[aria-checked="true"]')?.focus({ preventScroll: true });
}
// the menu belongs to its word: scrolling away closes it
let sheetY = 0;
addEventListener('scroll', () => { if (sheet.classList.contains('open') && Math.abs(scrollY - sheetY) > 24) closeSheet(); }, { passive: true });
function closeSheet() { sheet.classList.remove('open'); scrim.classList.remove('open'); words.forEach(b => b.setAttribute('aria-expanded', false)); }
words.forEach(b => b.addEventListener('click', () => openSheet(b)));
scrim.onclick = closeSheet;
function glide(y) {
  y = Math.max(0, Math.min(y, document.documentElement.scrollHeight - innerHeight));
  if (reduce) return scrollTo(0, y);
  const y0 = scrollY, d = y - y0, dur = Math.min(1100, 500 + Math.abs(d) * 0.4), t0 = performance.now();
  let stop = false; const halt = () => { stop = true; };
  addEventListener('wheel', halt, { once: true, passive: true }); addEventListener('touchstart', halt, { once: true, passive: true });
  const step = t => { if (stop) return; const k = Math.min(1, (t - t0) / dur), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; scrollTo(0, y0 + d * e); if (k < 1) requestAnimationFrame(step); else { removeEventListener('wheel', halt); removeEventListener('touchstart', halt); } };
  requestAnimationFrame(step);
}
if (!reduce && matchMedia('(pointer:fine)').matches) {
  // own float position: reading scrollY back each frame rounds to whole pixels and stalls the ease
  let target = 0, pos = 0, raf = 0, last = 0;
  const tick = t => {
    const dt = Math.min(64, t - (last || t)); last = t;
    pos += (target - pos) * (1 - Math.pow(.82, dt / 16.67));
    if (Math.abs(target - pos) < .5) { pos = target; scrollTo(0, pos); raf = 0; last = 0; return; }
    scrollTo(0, pos); raf = requestAnimationFrame(tick);
  };
  addEventListener('wheel', e => {
    if (e.ctrlKey || doodle.open || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    if (!raf) target = pos = scrollY;
    target = Math.max(0, Math.min(document.documentElement.scrollHeight - innerHeight, target + e.deltaY * (e.deltaMode === 1 ? 40 : 1)));
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: false });

  // magnet: header icons, the two sentence words and "See the projects" lean slightly toward a close pointer
  const mags = [...document.querySelectorAll('.top .ib, .w, .cue, .totop')].map(el => ({ el, x: 0, y: 0, max: el.matches('.ib') ? 4 : 6 }));
  let mf = 0;
  addEventListener('pointermove', e => {
    if (mf) return;
    mf = requestAnimationFrame(() => {
      mf = 0;
      if (doodle.open) e = { clientX: -1e4, clientY: -1e4 };
      for (const m of mags) {
        const r = m.el.getBoundingClientRect(), L = r.left - m.x, T = r.top - m.y; // rect without our own offset
        const ex = Math.max(L - e.clientX, 0, e.clientX - (L + r.width)), ey = Math.max(T - e.clientY, 0, e.clientY - (T + r.height));
        const f = Math.max(0, 1 - Math.hypot(ex, ey) / 40);
        const clamp = v => Math.max(-m.max, Math.min(m.max, v));
        const x = f ? clamp((e.clientX - L - r.width / 2) * .15) * f : 0, y = f ? clamp((e.clientY - T - r.height / 2) * .15) * f : 0;
        if (Math.abs(x - m.x) < .05 && Math.abs(y - m.y) < .05) continue;
        m.x = x; m.y = y;
        m.el.style.setProperty('--mx', x.toFixed(2) + 'px'); m.el.style.setProperty('--my', y.toFixed(2) + 'px');
      }
    });
  }, { passive: true });
}
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
  const line = s => {
    const W = cv.width, p = s.p;
    g.strokeStyle = s.c; g.lineWidth = s.w * W; g.lineCap = g.lineJoin = 'round';
    g.beginPath(); g.moveTo(p[0][0] * W, p[0][1] * W);
    if (p.length === 1) g.lineTo(p[0][0] * W + .1, p[0][1] * W);
    for (let i = 1; i < p.length; i++) g.lineTo(p[i][0] * W, p[i][1] * W);
    g.stroke();
  };
  const redraw = () => { frame = 0; g.clearRect(0, 0, cv.width, cv.height); strokes.forEach(line); if (live) line(live); };
  const fit = () => { const r = cv.getBoundingClientRect(), d = devicePixelRatio || 1; cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d); redraw(); };
  const pt = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.width]; };
  cv.addEventListener('pointerdown', e => { cv.setPointerCapture(e.pointerId); live = { c: color, w: size / cv.getBoundingClientRect().width, p: [pt(e)] }; redraw(); });
  cv.addEventListener('pointermove', e => { if (!live) return; const cs = e.getCoalescedEvents?.(); for (const c of cs?.length ? cs : [e]) live.p.push(pt(c)); if (!frame) frame = requestAnimationFrame(redraw); });
  const end = () => { if (live) { strokes.push(live); live = null; redraw(); paintFaces(); } };
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  const shut = () => {
    if (!doodle.open || doodle.classList.contains('closing')) return;
    doodle.classList.add('closing');
    setTimeout(() => { doodle.classList.remove('closing'); doodle.close(); }, reduce ? 0 : 280);
  };
  ddx.onclick = shut;
  doodle.addEventListener('click', e => { if (e.target === doodle) shut(); });
  doodle.addEventListener('cancel', e => { e.preventDefault(); shut(); });
  // the painted photo stays on the avatars until the page is left
  const paintFaces = () => {
    const url = strokes.length ? cv.toDataURL() : '';
    document.querySelectorAll('.face').forEach(f => {
      let ink = f.querySelector('.ink');
      if (!url) return ink?.remove();
      if (!ink) { ink = document.createElement('img'); ink.className = 'ink'; ink.alt = ''; f.append(ink); }
      ink.src = url;
    });
  };
  document.querySelectorAll('.face').forEach(b => b.addEventListener('click', () => { doodle.showModal(); fit(); }));
  addEventListener('resize', () => { if (doodle.open) fit(); });
}

// back-to-top button: shown once the visitor is well past the first screen
const upd = () => totop.classList.toggle('on', scrollY > innerHeight * 1.2);
let uf = 0; addEventListener('scroll', () => { if (!uf) uf = requestAnimationFrame(() => { uf = 0; upd(); }); }, { passive: true }); upd();
totop.addEventListener('click', () => glide(0));
const cue = document.querySelector('.cue');
cue.addEventListener('click', e => { e.preventDefault(); glide(document.getElementById('main').getBoundingClientRect().top + scrollY - 24); });
let nudging = [];
function nudge() {
  if (reduce || scrollY > innerHeight * .3) return;
  nudging.forEach(a => a.cancel());
  const c = getComputedStyle(cue), v = getComputedStyle(document.documentElement), on = { color: v.getPropertyValue('--ink'), backgroundColor: v.getPropertyValue('--sf') }, off = { color: c.color, backgroundColor: c.backgroundColor };
  nudging = [
    cue.animate([off, { ...on, offset: .15 }, { ...on, offset: .7 }, off], { duration: 1400, easing: 'ease-in-out' }),
    cue.querySelector('svg').animate([{ transform: 'none' }, { transform: 'translateY(5px)' }, { transform: 'none' }, { transform: 'translateY(3px)' }, { transform: 'none' }], { duration: 1100, delay: 150, easing: 'ease-in-out' }),
  ];
}
function flip(change, slots) {
  if (reduce) return change();
  const els = [...document.querySelectorAll('.hero .wd, .hero .meta')], before = els.map(e => e.getBoundingClientRect());
  change();
  els.forEach((e, i) => {
    const a = before[i], b = e.getBoundingClientRect(), dx = a.left - b.left, dy = a.top - b.top;
    if (Math.abs(dx) > .5 || Math.abs(dy) > .5) e.animate([{ transform: `translate(${dx}px,${dy}px)` }, { transform: 'none' }], { duration: 480, easing: 'cubic-bezier(.2,.8,.2,1)' });
  });
  words.filter(b => slots.includes(b.dataset.slot)).forEach(b => b.querySelector('.lbl').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, delay: 60, easing: 'ease-out', fill: 'backwards' }));
}
function choose(s, k) {
  if (cur[s].k === k) return;
  flip(() => { cur[s] = OPTS[s].find(o => o.k === k); relabel(s); apply(); }, [s]);
  const top = document.getElementById('main').getBoundingClientRect().top + scrollY - 72;
  if (scrollY > top) glide(top); else nudge();
}
sheet.addEventListener('click', e => { const b = e.target.closest('button'); if (!b || b.disabled) return; closeSheet(); choose(slot, b.dataset.k); });
reset.onclick = () => flip(() => { cur.what = OPTS.what[0]; cur.where = OPTS.where[0]; relabel('what'); relabel('where'); apply(); }, ['what', 'where']);

let opener = null;
words.forEach(b => b.addEventListener('click', () => { opener = b; }));
addEventListener('keydown', e => {
  if (!sheet.classList.contains('open')) return;
  if (e.key === 'Escape') { closeSheet(); opener?.focus(); }
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const items = [...sheet.querySelectorAll('button:not(:disabled)')], i = items.indexOf(document.activeElement);
    items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus();
  }
});

/* ---------- compact bar ---------- */
new IntersectionObserver(([e]) => {
  // above the (shrunk) viewport top = scrolled past; checking against 0 missed slow scrolls
  const on = !e.isIntersecting && e.boundingClientRect.top < e.rootBounds.top;
  dock.classList.toggle('on', on); dock.setAttribute('aria-hidden', !on);
  dock.querySelectorAll('.w').forEach(b => b.tabIndex = on ? 0 : -1);
  if (!on) closeSheet();
}, { rootMargin: '-60px 0px 0px 0px' }).observe(document.querySelector('.hero .meta'));

apply();
}
})();
