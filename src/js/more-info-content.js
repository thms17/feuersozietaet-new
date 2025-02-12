import gsap from 'gsap';

// Button & Panel über Attribute targetieren
const button = document.querySelector('[button-more-info="zahn"]');
const panel = document.querySelector('[tab-content-more-info="zahn"]');

if (button && panel) {
  // Initiale ARIA-Attribute setzen
  button.setAttribute('aria-expanded', 'false');
  panel.setAttribute('aria-hidden', 'true');
  panel.style.display = 'none';

  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const duration = 0.5;
    const ease = 'power2.inOut';

    if (isExpanded) {
      // Panel ausblenden
      button.setAttribute('aria-expanded', 'false');
      button.textContent = 'Mehr erfahren'; // Button-Text zurücksetzen
      panel.setAttribute('aria-hidden', 'true');

      gsap.to(panel, {
        height: 0,
        autoAlpha: 0,
        duration,
        ease,
        onComplete: () => {
          panel.style.display = 'none';
        },
      });
    } else {
      // Panel einblenden
      button.setAttribute('aria-expanded', 'true');
      button.textContent = 'Informationen schließen'; // Button-Text ändern
      panel.setAttribute('aria-hidden', 'false');
      panel.style.display = 'grid'; // Panel auf grid setzen

      gsap.fromTo(
        panel,
        { height: 0, autoAlpha: 0 },
        { height: 'auto', autoAlpha: 1, duration, ease }
      );
    }
  });
}
