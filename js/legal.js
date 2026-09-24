// Small fixed Impressum/Datenschutz link for standalone demo pages.
(() => {
  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "Rechtliches");
  nav.style.cssText =
    "position:fixed;left:8px;bottom:8px;z-index:2147483647;padding:3px 8px;border-radius:6px;" +
    "background:rgba(0,0,0,.55);font:12px/1.4 system-ui,sans-serif;";
  nav.innerHTML =
    '<a href="/impressum.html">Impressum</a> · <a href="/datenschutz.html">Datenschutz</a>';
  nav.querySelectorAll("a").forEach((a) => (a.style.cssText = "color:#fff;text-decoration:none;"));
  nav.style.color = "#fff";
  document.body.appendChild(nav);
})();
