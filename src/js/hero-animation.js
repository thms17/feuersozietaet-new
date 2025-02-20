import gsap from 'gsap';
import SplitType from 'split-type';

function animateHeroSection() {
  // Animation nur starten, wenn die Bildschirmbreite größer als 991px ist
  if (window.innerWidth <= 991) return;

  const heroHeading = document.querySelector('[hero-animation="heading"]');
  const heroSubtitle = document.querySelector('[hero-animation="subtitle"]');
  const heroMenuWrapper = document.querySelector('[hero-animation="menu-wrapper"]');
  const heroTabs = document.querySelectorAll('[hero-animation="tab"]');
  const heroContent = document.querySelectorAll('[hero-animation="content"]');
  const heroNavbar = document.querySelector('[hero-animation="navbar"]');
  const heroUnderline = document.querySelector('.highlight_underscore');

  // Sicherstellen, dass alle benötigten Elemente vorhanden sind
  if (
    !heroHeading ||
    !heroSubtitle ||
    !heroMenuWrapper ||
    !heroTabs.length ||
    !heroContent.length ||
    !heroNavbar
  ) {
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)', duration: 0.5 } });

  // 1️⃣ Headline mit SplitText animieren
  const splitText = new SplitType(heroHeading, { types: 'chars' });

  // Zuerst das gesamte Heading sichtbar machen
  tl.set(heroHeading, { opacity: 1 });

  tl.from(splitText.chars, {
    opacity: 0,
    y: 10,
    stagger: 0.03,
    duration: 0.3,
  });

  // 2️⃣ Underline **erscheint nach der Headline, aber ohne Verzögerung**
  tl.fromTo(heroUnderline, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5');

  // 3️⃣ Subheadline mit sanftem Fade-in und Y-Versatz
  tl.fromTo(
    heroSubtitle,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
    '-=0.3' // Bleibt synchron mit der letzten Animation
  );

  // 4️⃣ Menu-Wrapper zuerst animieren (von unten nach oben)
  tl.fromTo(
    heroMenuWrapper,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.3, ease: 'back.out(1.9)' },
    '-=0.25'
  );

  // 5️⃣ Tabs animieren mit Back.easeOut und Y-Shift
  tl.fromTo(
    heroTabs,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.1, ease: 'back' },
    '-=0.2'
  );

  // 6️⃣ Inhaltsboxen mit Blur-Effekt einblenden **Gleichzeitig mit Navbar**
  tl.addLabel('contentAndNavbar', '-=0.1')
    .fromTo(
      heroContent,
      { opacity: 0, filter: 'blur(10px)', y: 15 },
      { opacity: 1, filter: 'blur(0px)', y: 0, stagger: 0.15, duration: 0.9, ease: 'back.out(2)' },
      'contentAndNavbar'
    )
    .fromTo(
      heroNavbar,
      { opacity: 0, filter: 'blur(10px)', y: -15 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.9, ease: 'back.out(2)' },
      'contentAndNavbar'
    );
}

animateHeroSection();
