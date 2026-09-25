// Header icons lean slightly toward a close mouse pointer (desktop only), same as on the home page.
(() => {
  if (!matchMedia("(pointer:fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const mags = [...document.querySelectorAll(".bar .soc a")].map((el) => ({ el, x: 0, y: 0 }));
  let frame = 0;
  addEventListener("pointermove", (e) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      for (const m of mags) {
        const r = m.el.getBoundingClientRect(), L = r.left - m.x, T = r.top - m.y;
        const ex = Math.max(L - e.clientX, 0, e.clientX - (L + r.width)), ey = Math.max(T - e.clientY, 0, e.clientY - (T + r.height));
        const f = Math.max(0, 1 - Math.hypot(ex, ey) / 40);
        const clamp = (v) => Math.max(-4, Math.min(4, v));
        const x = f ? clamp((e.clientX - L - r.width / 2) * 0.15) * f : 0, y = f ? clamp((e.clientY - T - r.height / 2) * 0.15) * f : 0;
        if (Math.abs(x - m.x) < 0.05 && Math.abs(y - m.y) < 0.05) continue;
        m.x = x; m.y = y;
        m.el.style.setProperty("--mx", x.toFixed(2) + "px");
        m.el.style.setProperty("--my", y.toFixed(2) + "px");
      }
    });
  }, { passive: true });
})();
