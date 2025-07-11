// Fondo animado: partículas cuadradas + burbujas
const bg = document.querySelector(".bg-animated");

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

// Partículas cuadradas
for (let i = 0; i < 22; i++) {
  const p = document.createElement("div");
  p.className = "bg-square";
  p.style.width = p.style.height = randomBetween(7, 18) + "px";
  p.style.left = randomBetween(0, 96) + "vw";
  p.style.top = randomBetween(0, 97) + "vh";
  p.style.opacity = randomBetween(0.12, 0.38);
  p.style.background = `rgba(84,197,113,${randomBetween(0.5, 0.9)})`;
  p.style.borderRadius =
    Math.random() > 0.8 ? "8px" : Math.random() > 0.5 ? "2px" : "36%";
  p.style.position = "absolute";
  bg.appendChild(p);

  // Animación flotante
  const anim = p.animate(
    [
      { transform: "translateY(0px) scale(1)", opacity: p.style.opacity },
      {
        transform: `translateY(${randomBetween(
          -40,
          40
        )}px) scale(${randomBetween(0.8, 1.2)})`,
        opacity: randomBetween(0.13, 0.43),
      },
    ],
    {
      duration: randomBetween(4000, 8800),
      direction: "alternate",
      iterations: Infinity,
      easing: "ease-in-out",
      delay: randomBetween(0, 4200),
    }
  );
}

// Burbujas
for (let i = 0; i < 13; i++) {
  const b = document.createElement("div");
  b.className = "bg-bubble";
  b.style.width = b.style.height = randomBetween(18, 56) + "px";
  b.style.left = randomBetween(0, 98) + "vw";
  b.style.top = randomBetween(0, 99) + "vh";
  b.style.opacity = randomBetween(0.07, 0.23);
  b.style.background = `rgba(191,255,224,${randomBetween(0.4, 0.8)})`;
  b.style.position = "absolute";
  bg.appendChild(b);

  b.animate(
    [
      { transform: "translateY(0px) scale(1)", opacity: b.style.opacity },
      {
        transform: `translateY(${randomBetween(
          -70,
          70
        )}px) scale(${randomBetween(0.8, 1.25)})`,
        opacity: randomBetween(0.13, 0.43),
      },
    ],
    {
      duration: randomBetween(5000, 12000),
      direction: "alternate",
      iterations: Infinity,
      easing: "ease-in-out",
      delay: randomBetween(0, 9000),
    }
  );
}

// Animación de saludo
const btnSaludo = document.getElementById("btnSaludo");
const bubbleMsg = document.getElementById("bubbleMsg");
const mensajes = [
  "¡Hola! ¡Me alegra verte aquí! 💚",
  "¡Gracias por tu interés en el reciclaje creativo! 🌱",
  "Recuerda, cada acción cuenta. ¡Tú puedes ser el cambio! ✨",
  "¡Sigue explorando y aprendiendo sobre el planeta! 🌎",
  "¡Juntos podemos lograr un Perú más limpio y justo! 🇵🇪",
  "La tecnología y el arte pueden ayudar a salvar el mundo. 🤖🎨",
];
btnSaludo.addEventListener("click", () => {
  bubbleMsg.classList.remove("active");
  setTimeout(() => {
    bubbleMsg.textContent =
      mensajes[Math.floor(Math.random() * mensajes.length)];
    bubbleMsg.classList.add("active");
    const wave = document.getElementById("emojiWave");
    wave.style.animation = "waveHand 1.2s 2";
    setTimeout(() => (wave.style.animation = ""), 2400);
  }, 90);
});
bubbleMsg.addEventListener("click", () => {
  bubbleMsg.classList.remove("active");
});

// Animación de entrada
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(
    () => (document.querySelector(".card-presentadora").style.opacity = 1),
    80
  );
  setTimeout(
    () => (document.querySelector(".circle-presentadora").style.opacity = 1),
    220
  );
  setTimeout(
    () => (document.querySelector(".presenter-title").style.opacity = 1),
    400
  );
  setTimeout(() => {
    const intro = document.querySelector(".introduction");
    intro.style.opacity = 1;
  }, 700);
  setTimeout(() => {
    btnSaludo.style.opacity = 1;
    btnSaludo.style.transform = "scale(1)";
  }, 1100);
});
