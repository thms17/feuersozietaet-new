import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'; // Korrektes Importieren von ScrollTrigger

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

// Initialisiere die Animationen nur auf Bildschirmen ab 992px
mm.add('(min-width: 992px)', () => {
  // Funktion zur Initialisierung der `move-up`-Animation
  function initMoveUp() {
    const moveUpElements = document.querySelectorAll('[move-up]');
    if (!moveUpElements.length) return; // Prüfen, ob Elemente vorhanden sind
    moveUpElements.forEach((element) => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  // Funktion zur Initialisierung der `move-up-slow`-Animation
  function initMoveUpSlow() {
    const moveUpSlowElements = document.querySelectorAll('[move-up-slow]');
    if (!moveUpSlowElements.length) return; // Prüfen, ob Elemente vorhanden sind
    moveUpSlowElements.forEach((element) => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  // Funktion zur Initialisierung der `move-up-stagger`-Animation
  function initMoveUpStagger() {
    const staggerContainers = document.querySelectorAll('[move-up-stagger]');
    if (!staggerContainers.length) return; // Prüfen, ob Elemente vorhanden sind
    staggerContainers.forEach((container) => {
      gsap.fromTo(
        Array.from(container.children),
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: container,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  // Initialisiere die Animationen
  initMoveUp();
  initMoveUpSlow();
  initMoveUpStagger();

  // Rückgabefunktion, die alle ScrollTrigger entfernt, wenn die Breite unter 992px fällt
  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
});
