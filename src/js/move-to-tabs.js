document.querySelectorAll('[tabs-nav="link"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (window.innerWidth < 768) {
      // Nur auf Mobile
      setTimeout(() => {
        const target = document.getElementById('versicherungs-tabs');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // Kleine Verzögerung, damit Webflow den Tab wechseln kann
    }
  });
});
