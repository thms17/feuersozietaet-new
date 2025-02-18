import gsap from 'gsap';

const menuWrapper = document.querySelector('[tabs-nav="menu-wrapper"]');
const background = document.querySelector('[tabs-nav="background"]');
const tabs = Array.from(menuWrapper?.children || []);

if (menuWrapper && background && tabs.length) {
  function getRows() {
    const rows = [];

    tabs.forEach((tab) => {
      const tabTop = tab.getBoundingClientRect().top;
      let row = rows.find((r) => Math.abs(r[0].getBoundingClientRect().top - tabTop) < 5);

      if (!row) {
        row = [];
        rows.push(row);
      }

      row.push(tab);
    });

    return rows;
  }

  function getRemValue(multiplier = 1) {
    return parseFloat(getComputedStyle(document.documentElement).fontSize) * multiplier;
  }

  gsap.set(background, { x: 0, y: 0 });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const rows = getRows();
      const rowIndex = rows.findIndex((row) => row.includes(tab));
      const colIndex = rows[rowIndex].indexOf(tab);

      const xOffset = colIndex * 100;
      const tabHeight = tabs[0].offsetHeight;
      const yOffset = rowIndex * (tabHeight + getRemValue(1));

      gsap.to(background, {
        xPercent: xOffset,
        y: yOffset,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  });
}
