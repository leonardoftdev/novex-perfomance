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