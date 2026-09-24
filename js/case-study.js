document.addEventListener("DOMContentLoaded", () => {
  const galleryLinks = document.querySelectorAll(".gallery-grid a");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  if (!lightbox || !lightboxImg || !lightboxClose) return;

  const openLightbox = (imgSrc, imgAlt) => {
    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  galleryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const img = link.querySelector("img");
      openLightbox(link.href, img ? img.alt : "Enlarged image");
    });
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightboxClose) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });

  // 2-Click YouTube Facade (DSGVO / GDPR compliant - loads zero external data until clicked)
  const videoFacades = document.querySelectorAll(".video-facade");
  videoFacades.forEach((facade) => {
    facade.addEventListener("click", () => {
      const videoId = facade.getAttribute("data-video-id");
      const title = facade.getAttribute("data-video-title") || "YouTube video player";
      if (!videoId) return;

      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
      iframe.title = title;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;

      facade.innerHTML = "";
      facade.classList.remove("video-facade");
      facade.appendChild(iframe);
    });
  });
});
