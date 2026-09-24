// Spline scenes load only after a click: the runtime contacts Spline (USA) and Google Fonts.
const scenes = {
  canvas3d: "https://prod.spline.design/Ep4TGhpwkc-U3k9Z/scene.splinecode",
  "canvas3d-globe": "https://prod.spline.design/ge9-WQvAhORVziZw/scene.splinecode",
  "canvas3d-chest": "https://prod.spline.design/EPsID204XcJih6aY/scene.splinecode",
  "canvas3d-book": "https://prod.spline.design/V8jocpL6oSzSOu-H/scene.splinecode",
};

for (const [id, url] of Object.entries(scenes)) {
  const canvas = document.getElementById(id);
  if (!canvas) continue;

  const wrap = document.createElement("div");
  wrap.className = "spline-wrap";
  canvas.replaceWith(wrap);

  const facade = document.createElement("div");
  facade.className = "spline-consent";
  facade.innerHTML =
    '<button type="button">3D-Szene laden</button>' +
    "<p>Beim Laden werden Daten (u.&nbsp;a. Ihre IP-Adresse) an Spline (USA) und Google Fonts übertragen. " +
    '<a href="/datenschutz.html">Datenschutz</a></p>';
  wrap.append(canvas, facade);

  facade.querySelector("button").addEventListener("click", async () => {
    facade.remove();
    const { Application } = await import("@splinetool/runtime");
    new Application(canvas).load(url);
  });
}
