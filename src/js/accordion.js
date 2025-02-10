import gsap from 'gsap';

function faqAccordion() {
  const faqQuestions = document.querySelectorAll('[faq-accordion="component"]');

  if (faqQuestions.length === 0) return;

  faqQuestions.forEach(function (accordion) {
    const button = accordion.querySelector('[faq-accordion="trigger"]');
    const panel = accordion.querySelector('[faq-accordion="panel"]');
    const plusIcon = accordion.querySelector('[faq-accordion="plus-icon"]');
    const minusIcon = accordion.querySelector('[faq-accordion="minus-icon"]');
    const text = accordion.querySelector('[faq-accordion="text"]');

    if (!button || !panel) return; // Falls Button oder Panel fehlen, abbrechen

    // Initiale ARIA-Attribute setzen
    button.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');

    button.addEventListener('click', function () {
      const isOpen = button.getAttribute('aria-expanded') === 'true'; // Prüfen, ob geöffnet ist
      const duration = 0.5;
      const ease = 'power2.inOut';

      if (!isOpen) {
        // Panel aufklappen
        button.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-hidden', 'false');

        gsap.fromTo(
          panel,
          {
            height: 0,
            autoAlpha: 0,
          },
          {
            height: 'auto',
            autoAlpha: 1,
            duration,
            ease,
          }
        );
        gsap.to(plusIcon, {
          rotation: 90,
          autoAlpha: 0,
          duration: 0.4,
          ease,
        });
        gsap.to(minusIcon, {
          rotation: 0,
          autoAlpha: 1,
          duration: 0.4,
          ease,
        });
        gsap.to(text, {
          y: '0%',
          scale: 1,
          duration,
          ease,
        });
      } else {
        // Panel einklappen
        button.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');

        gsap.to(panel, {
          height: 0,
          autoAlpha: 0,
          duration,
          ease,
        });
        gsap.to(minusIcon, {
          rotation: -90,
          autoAlpha: 0,
          duration: 0.4,
          ease,
        });
        gsap.to(plusIcon, {
          rotation: 0,
          autoAlpha: 1,
          duration: 0.4,
          ease,
        });
        gsap.to(text, {
          y: '-10%',
          scale: 0.95,
          duration,
          ease,
        });
      }
    });
  });
}

faqAccordion();
