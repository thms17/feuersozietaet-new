import gsap from 'gsap';

function faqAccordion() {
  const faqItems = document.querySelectorAll('[faq-accordion="component"]');

  if (faqItems.length === 0) return;

  faqItems.forEach(function (accordion) {
    const trigger = accordion.querySelector('[faq-accordion="trigger"]');
    const panel = accordion.querySelector('[faq-accordion="panel"]');
    const plusIcon = accordion.querySelector('[faq-accordion="plus-icon"]');
    const minusIcon = accordion.querySelector('[faq-accordion="minus-icon"]');
    const text = accordion.querySelector('[faq-accordion="text"]');

    if (!trigger || !panel) return;

    // Initiale ARIA-Attribute setzen
    trigger.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');

    // Event Listener für Klick
    trigger.addEventListener('click', function () {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      const duration = 0.5;
      const ease = 'power2.inOut';

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-hidden', 'false');

        gsap.fromTo(
          panel,
          { height: 0, autoAlpha: 0 },
          { height: 'auto', autoAlpha: 1, duration, ease }
        );
        gsap.to(plusIcon, { rotation: 90, autoAlpha: 0, duration: 0.4, ease });
        gsap.to(minusIcon, { rotation: 0, autoAlpha: 1, duration: 0.4, ease });
        gsap.to(text, { y: '0%', scale: 1, duration, ease });
      } else {
        trigger.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');

        gsap.to(panel, { height: 0, autoAlpha: 0, duration, ease });
        gsap.to(minusIcon, { rotation: -90, autoAlpha: 0, duration: 0.4, ease });
        gsap.to(plusIcon, { rotation: 0, autoAlpha: 1, duration: 0.4, ease });
        gsap.to(text, { y: '-10%', scale: 0.95, duration, ease });
      }
    });

    // Unterstützung für Keyboard-Navigation (Enter + Space)
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });
}

faqAccordion();
