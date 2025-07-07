// Transición 2 en dashboard.html al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("transitionVideo2");
  const canvas = document.getElementById("transitionCanvas2");
  const ctx = canvas.getContext("2d");
  canvas.style.display = "block";
  canvas.style.opacity = "1";

  function resizeCanvas() {
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
  }
  if (video.readyState >= 1) {
    resizeCanvas();
  } else {
    video.onloadedmetadata = resizeCanvas;
  }

  video.currentTime = 0;
  video.play();

  let animationId;
  function render() {
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
      animationId = requestAnimationFrame(render);
    }
  }
  video.onplay = () => render();

  video.onended = () => {
    cancelAnimationFrame(animationId);
    canvas.style.transition = "opacity 0.7s";
    canvas.style.opacity = 0;
    setTimeout(() => {
      canvas.style.display = "none";
    }, 700);
  };
});
