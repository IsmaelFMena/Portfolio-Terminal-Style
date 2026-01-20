document.addEventListener("DOMContentLoaded", () => {
  // --- Gutter Line Numbers Generation & Animation ---
  const gutter = document.getElementById("gutter");
  const lineCount = 100; // Suficientes líneas para cubrir el scroll

  if (gutter) {
    for (let i = 1; i <= lineCount; i++) {
      const span = document.createElement("span");
      span.textContent = i;
      gutter.appendChild(span);
    }

    const gutterLines = gutter.querySelectorAll("span");
    const lineHeight = 1.6 * 14.4; // Estimado basado en line-height 1.6 y font-size 0.9rem (16px * 0.9)

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Calcular qué "línea" está en el centro o tope
      const scrollPercent = scrollTop / (docHeight - windowHeight);
      const activeLineIdx = Math.floor(scrollPercent * (lineCount - 1));

      gutterLines.forEach((span, idx) => {
        span.classList.remove("active-line");
        // Efecto de desplazamiento de los números
        span.style.transform = `translateY(-${scrollTop * 0.1}px)`;

        if (idx === activeLineIdx) {
          span.classList.add("active-line");
        }
      });
    });
  }

  // --- Typewriter Effect ---
  const typewriterElement = document.getElementById("typewriter");
  const phrases = ["Ismael Flores Mena", "Developer", "Fullstack"];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // Borrar más rápido
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 150; // Escribir normal
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pausa al terminar de escribir
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length; // Siguiente frase
      typeSpeed = 500; // Pausa antes de empezar a escribir la nueva
    }

    setTimeout(type, typeSpeed);
  }

  // Iniciar animación
  if (typewriterElement) {
    type();
  }

  // --- Formulario de Contacto (Simulación CLI) ---
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !message) {
        alert("ERROR: Missing required arguments.");
        return;
      }

      const subject = encodeURIComponent(`[Portfolio] Mensaje de ${name}`);
      const body = encodeURIComponent(`De: ${name} <${email}>\n\n${message}`);
      const mailtoLink = `mailto:devismaelfmena@gmail.com?subject=${subject}&body=${body}`;

      window.location.href = mailtoLink;

      // Efecto visual de comando ejecutado
      const btn = document.querySelector(".btn-run");
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="ri-check-line"></i> SENT';
      btn.style.backgroundColor = "var(--ctp-green)";

      setTimeout(() => {
        contactForm.reset();
        btn.innerHTML = originalText;
        btn.style.backgroundColor = "";
      }, 3000);
    });
  }

  // --- Active Link en Navbar ---
  const sections = document.querySelectorAll("section, header");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
});

