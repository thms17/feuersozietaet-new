import gsap from 'gsap';

const menuWrapper = document.querySelector('[tabs-nav="menu-wrapper"]');
const background = document.querySelector('[tabs-nav="background"]');
const tabs = Array.from(menuWrapper?.children || []);

if (menuWrapper && background && tabs.length) {
  console.log('Tabs gefunden:', tabs.length);

  // Setze das Background-Element initial auf das erste Tab
  gsap.set(background, { xPercent: 0, yPercent: 0 });

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      const firstTabTop = tabs[0].offsetTop; // Y-Position des ersten Tabs
      const currentTabTop = tab.offsetTop; // Y-Position des angeklickten Tabs

      const rowIndex = currentTabTop === firstTabTop ? 0 : 1; // 0 = erste Reihe, 1 = zweite Reihe

      gsap.to(background, {
        xPercent: index * 100, // Horizontal verschieben
        yPercent: rowIndex * 100, // Falls zweite Reihe, vertikal verschieben
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  });
} else {
  console.warn('Tabs oder Background nicht gefunden.');
}
