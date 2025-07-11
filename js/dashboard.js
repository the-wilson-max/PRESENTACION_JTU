window.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("imageOverlay");
  // Esperamos brevemente antes de desvanecer
  setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.style.display = "none";
    }, 1200); // Tiempo de animación
  }, 500); // Tiempo visible inicial
});
// Cargar contenido HTML externo en el contenedor
function cargarContenido(ruta) {
  fetch(ruta)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("main-content").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}

// Cargar general.html por defecto al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarContenido("general.html");

  // Manejar clics en el menú
  document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Marcar el link activo
      document
        .querySelectorAll(".sidebar-link")
        .forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Obtener el nombre del archivo según el ID del href
      const id = link.getAttribute("href").substring(1); // elimina el #
      cargarContenido(`${id}.html`);
    });
  });
});
