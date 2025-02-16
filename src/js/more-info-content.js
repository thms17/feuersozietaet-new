import gsap from 'gsap';

function initMoreInfoToggles() {
  const buttons = document.querySelectorAll('[button-more-info]');

  buttons.forEach((button) => {
    const targetValue = button.getAttribute('button-more-info');
    const panel = document.querySelector(`[tab-content-more-info="${targetValue}"]`);

    if (!panel) return;

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
        panel.style.display = 'block'; // Panel auf grid setzen

        gsap.fromTo(
          panel,
          { height: 0, autoAlpha: 0 },
          { height: 'auto', autoAlpha: 1, duration, ease }
        );
      }
    });
  });
}

initMoreInfoToggles();
