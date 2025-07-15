
      // Ocultar fondo de carga
      window.addEventListener("DOMContentLoaded", () => {
        const overlay = document.getElementById("imageOverlay");
        setTimeout(() => {
          overlay.style.opacity = "0";
          setTimeout(() => {
            overlay.style.display = "none";
          }, 1000);
        }, 500);

        const menuToggle = document.getElementById("menuToggle");
        const sidebar = document.querySelector(".sidebar");
        menuToggle.addEventListener("click", () => {
          sidebar.classList.toggle("active");
        });

        // Cargar página inicial
        const primerLink = document.querySelector('.sidebar-link');
        cargarContenido('general.html', primerLink);
      });

      function cargarContenido(ruta, link = null) {
        fetch(ruta)
          .then(res => res.text())
          .then(data => {
            const contenedor = document.getElementById('main-content');
            contenedor.innerHTML = data;

            // Ejecutar scripts embebidos
            const scripts = contenedor.querySelectorAll("script");
            scripts.forEach(script => {
              const nuevoScript = document.createElement("script");
              if (script.src) {
                nuevoScript.src = script.src;
              } else {
                nuevoScript.textContent = script.textContent;
              }
              document.body.appendChild(nuevoScript);
              script.remove(); // evitar duplicados
            });

            // Activar enlace de menú
            if (link) {
              document.querySelectorAll(".sidebar-link").forEach(l => l.classList.remove("active"));
              link.classList.add("active");
            }
          })
          .catch(err => console.error("Error al cargar:", err));
      }