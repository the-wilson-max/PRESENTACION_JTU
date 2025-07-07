// Transición 1 en index.html al dar click en el botón
document.getElementById("btnDashboard").addEventListener("click", () => {
  const video = document.getElementById("transitionVideo1");
  const canvas = document.getElementById("transitionCanvas1");
  const ctx = canvas.getContext("2d");
  canvas.style.display = "block";
  canvas.style.opacity = "1";

  function resizeCanvas() {
    canvas.width = video.videoWidth / 2;
    canvas.height = video.videoHeight / 2;
  }
  if (video.readyState >= 1) {
    resizeCanvas();
  } else {
    video.onloadedmetadata = resizeCanvas;
  }

  video.currentTime = 0;
  video.playbackRate = 1.0; // Asegura velocidad normal
  video.play();

  // Transición más fluida usando requestVideoFrameCallback
  function render(now, metadata) {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = frame.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i],
        g = d[i + 1],
        b = d[i + 2];
      if (g > 110 && r < 100 && b < 100 && g > r * 1.3 && g > b * 1.3) {
        d[i + 3] = 0;
      }
    }
    ctx.putImageData(frame, 0, 0);
    if (!video.paused && !video.ended) {
      video.requestVideoFrameCallback(render);
    }
  }

  video.onplay = () => {
    video.requestVideoFrameCallback(render);
  };

  video.onended = () => {
    // No se oculta el canvas ni se cambia su opacidad
    // Esperamos un breve momento antes de cambiar la página
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 700);
  };
});

// Animación de texto/botón (igual que antes)
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(
    () => (document.querySelector(".animated-title").style.opacity = 1),
    100
  );
  setTimeout(
    () => (document.querySelector(".animated-subtitle").style.opacity = 1),
    350
  );
  setTimeout(
    () => (document.querySelector(".animated-description").style.opacity = 1),
    600
  );
  setTimeout(
    () => (document.querySelector(".animated-btn").style.opacity = 1),
    800
  );
});

// Carrusel de animales con animaciones dinámicas (igual que antes)
const animalImgs = [
  { src: "uploads/animal1.jpg", name: "Gato andino" },
  { src: "uploads/animal2.jpg", name: "Pava aliblanca" },
  { src: "uploads/animal3.jpg", name: "Mono choro de cola amarilla" },
  { src: "uploads/animal4.jpg", name: "Rana del Titicaca" },
  { src: "uploads/animal5.jpg", name: "Cóndor andino" },
];
let lastIdx = 0;

function animateAnimalChange(idx) {
  const img = document.getElementById("carouselImage");
  const name = document.getElementById("carouselName");
  const wrapper = document.getElementById("animalImgWrapper");

  img.classList.add("fadeOutZoom");
  name.classList.add("fadeOutZoom");
  wrapper.classList.add("shake");

  setTimeout(() => {
    img.src = animalImgs[idx].src;
    img.alt = animalImgs[idx].name;
    name.textContent = animalImgs[idx].name;
    img.classList.remove("fadeOutZoom");
    name.classList.remove("fadeOutZoom");
    img.classList.add("fadeInZoom");
    name.classList.add("fadeInZoom");
    setTimeout(() => {
      wrapper.classList.remove("shake");
      img.classList.remove("fadeInZoom");
      name.classList.remove("fadeInZoom");
    }, 600);
    lastIdx = idx;
  }, 400);
}

function showRandomAnimal() {
  let idx;
  do {
    idx = Math.floor(Math.random() * animalImgs.length);
  } while (idx === lastIdx);
  animateAnimalChange(idx);
}
setInterval(showRandomAnimal, 3000);
