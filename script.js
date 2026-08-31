// === CURSOR SPOTLIGHT ===

const cursorSpot = document.getElementById("cursorSpot");

const isFinePointer = window.matchMedia("(pointer: fine)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (isFinePointer && !reduceMotion) {

  let ticking = false;

  document.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    cursorSpot.classList.add("is-active");

    if (!ticking) {

      window.requestAnimationFrame(() => {

        cursorSpot.style.setProperty("--mx", `${x}%`);
        cursorSpot.style.setProperty("--my", `${y}%`);

        ticking = false;
      });

      ticking = true;
    }
  });

  document.addEventListener("mouseleave", () => {
    cursorSpot.classList.remove("is-active");
  });
}

// === INDICADOR DA NAV ===

const sections = document.querySelectorAll(
  "#hero, #produtos, #tecnologia, #sobre"
);

const navLinks = document.querySelectorAll(".nav__link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(
        `.nav__list a[href="#${entry.target.id}"]`
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }
    });
  },
  {
    rootMargin: "-20% 0px -65% 0px",
    threshold: 0
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

window.addEventListener("scroll", () => {
  const atBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 50;

  if (atBottom) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    document
      .querySelector('.nav__list a[href="#contato"]')
      ?.classList.add("active");
  }
});

// === MENU MOBILE ===

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

  menuToggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
      menuToggle.classList.toggle("is-active");

      const isOpen = nav.classList.contains("is-open");

      menuToggle.setAttribute("aria-expanded", isOpen);
  });

  navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuToggle.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
  });