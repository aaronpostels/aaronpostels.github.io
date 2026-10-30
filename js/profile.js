// Profile page: icon magnet and photo cursor, same behaviour as the home page (mouse only).
(() => {
  if (!matchMedia('(pointer:fine)').matches) return;
  const pcur = document.getElementById('pcur');
  let px = 0, py = 0, pf = 0;
  const place = () => { pf = 0; pcur.style.transform = 'translate(' + px + 'px,' + py + 'px)'; };
  addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; if (!pf) pf = requestAnimationFrame(place); }, { passive: true });
  document.querySelectorAll('a.me').forEach(a => {
    a.addEventListener('pointerenter', e => { px = e.clientX; py = e.clientY; place(); pcur.classList.add('on'); });
    a.addEventListener('pointerleave', () => pcur.classList.remove('on'));
  });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const mags = [...document.querySelectorAll('.top .ib, .foot .soc a, a.me')].map(el => ({ el, x: 0, y: 0, max: el.matches('.ib') ? 4 : 6 }));
  let mf = 0;
  addEventListener('pointermove', e => {
    if (mf) return;
    mf = requestAnimationFrame(() => {
      mf = 0;
      for (const m of mags) {
        const r = m.el.getBoundingClientRect(), L = r.left - m.x, T = r.top - m.y;
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
})();
