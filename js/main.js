document.getElementById("btnDashboard").addEventListener("click", () => {
  const canvas = document.getElementById("transitionCanvas1");
  const ctx = canvas.getContext("2d");
  canvas.style.display = "block";
  canvas.style.opacity = "1";

  // Lista de imágenes-frame
  const framePaths = [
    "uploads/frame1.png",
    "uploads/frame2.png",
    "uploads/frame3.png",
    "uploads/frame4.png",
  ];

  const frames = [];
  let loaded = 0;

  // Cargar todas las imágenes
  framePaths.forEach((path, index) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      frames[index] = img;
      loaded++;
      if (loaded === framePaths.length) {
        startFrameAnimation();
      }
    };
  });

  function applyChromaKey(image) {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = frame.data;

    for (let i = 0; i < d.length; i += 4) {
      const r = d[i],
        g = d[i + 1],
        b = d[i + 2];
      const greenThreshold = 120;
if (
  g > greenThreshold &&
  g > r * 1.2 &&
  g > b * 1.2 &&
  r < 140 && b < 140
) {
  d[i + 3] = 0; // Hacer transparente
}
    }

    ctx.putImageData(frame, 0, 0);
  }

  function startFrameAnimation() {
    let i = 0;
    const frameInterval = 350; // milisegundos por frame (12.5 fps)

    const interval = setInterval(() => {
      applyChromaKey(frames[i]);
      i++;
      if (i >= frames.length) {
        clearInterval(interval);

        // Esperamos un momento y luego redirigimos
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 800);
      }
    }, frameInterval);
  }
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
window.addEventListener('load', () => {
  const leftDoor = document.querySelector('.left-door');
  const rightDoor = document.querySelector('.right-door');
  const container = document.getElementById('doorContainer');

  setTimeout(() => {
    leftDoor.classList.add('open-left');
    rightDoor.classList.add('open-right');
  }, 500); // espera 0.5s y luego abre

  setTimeout(() => {
    container.style.display = 'none'; // oculta el contenedor tras la animación
  }, 2500); // espera 2.5s para ocultarlo
});
 const videoId = "  c5P_awdbVuA"; // ejemplo: "dQw4w9WgXcQ"

  // Carga la API de YouTube
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  let player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player("ytplayer", {
      height: "0",
      width: "0",
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: videoId,
        controls: 0,
        mute: 0
      },
      events: {
        onReady: function (event) {
          event.target.setVolume(30); // puedes ajustar el volumen
          event.target.playVideo();
        }
      }
    });
  }
  window.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('backgroundMusic');

  // Verifica si ya se reprodujo la música en esta sesión
  if (!sessionStorage.getItem('musicPlayed')) {
    music.play().then(() => {
      sessionStorage.setItem('musicPlayed', 'true');
    }).catch(err => {
      console.log('Autoplay bloqueado:', err);
    });
  }
});
const music = document.getElementById('backgroundMusic');
const toggleBtn = document.getElementById('toggleMusicBtn');

// Estado inicial
let musicPlaying = false;

toggleBtn.addEventListener('click', () => {
  if (musicPlaying) {
    music.pause();
    toggleBtn.textContent = '🔇 Música';
  } else {
    music.play().catch(err => console.log('Error al reproducir:', err));
    toggleBtn.textContent = '🔊 Música';
  }
  musicPlaying = !musicPlaying;
});