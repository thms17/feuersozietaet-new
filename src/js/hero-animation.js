import gsap from 'gsap';
import SplitType from 'split-type';

function animateHeroSection() {
  const heroHeading = document.querySelector('[hero-animation="heading"]');
  const heroSubtitle = document.querySelector('[hero-animation="subtitle"]');
  const heroMenuWrapper = document.querySelector('[hero-animation="menu-wrapper"]');
  const heroTabs = document.querySelectorAll('[hero-animation="tab"]');
  const heroContent = document.querySelectorAll('[hero-animation="content"]');
  const heroNavbar = document.querySelector('[hero-animation="navbar"]');
  const heroUnderline = document.querySelector('.highlight_underscore');

  const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)', duration: 0.5 } });

  // 1️⃣ Headline mit SplitText animieren
  if (heroHeading) {
    const splitText = new SplitType(heroHeading, { types: 'chars' });
    tl.from(splitText.chars, {
      opacity: 0,
      y: 10,
      stagger: 0.03,
      duration: 0.35,
    });
  }

  // 2️⃣ Underline **erscheint nach der Headline, aber ohne Verzögerung**
  if (heroUnderline) {
    tl.fromTo(heroUnderline, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
  }

  // 3️⃣ Subheadline mit sanftem Fade-in und Y-Versatz
  if (heroSubtitle) {
    tl.from(heroSubtitle, { opacity: 0, y: 10 }, '-=0.3');
  }

  // 4️⃣ Menu-Wrapper zuerst animieren (von unten nach oben)
  if (heroMenuWrapper) {
    tl.fromTo(heroMenuWrapper, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, '-=0.2');
  }

  // 5️⃣ Tabs animieren mit Back.easeOut und Y-Shift
  if (heroTabs.length) {
    tl.fromTo(
      heroTabs,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.1, ease: 'back' },
      '-=0.15' // Kleinere Intensität für mehr Sichtbarkeit
    );
  }

  // 6️⃣ Inhaltsboxen mit Blur-Effekt einblenden **Gleichzeitig mit Navbar**
  if (heroContent.length && heroNavbar) {
    tl.addLabel('contentAndNavbar', '+=0.07') // Label für Synchronisation
      .fromTo(
        heroContent,
        { opacity: 0, filter: 'blur(10px)', y: 15 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: 'back.out(2)',
        },
        'contentAndNavbar'
      )
      .fromTo(
        heroNavbar,
        { opacity: 0, filter: 'blur(10px)', y: -15 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.9, ease: 'back.out(2)' },
        'contentAndNavbar'
      );
  }
}

animateHeroSection();
