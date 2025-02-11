import { gsap } from 'gsap';

const marqueeList = document.querySelector('.marquee-list');
const cards = document.querySelectorAll('.review_card');
const cardWidth =
  cards[0].offsetWidth / parseFloat(getComputedStyle(document.documentElement).fontSize) + 2; // in rem umgerechnet
let index = 0;
const totalCards = cards.length;
const visibleCards = 3;

function moveMarquee() {
  index++;

  if (index > totalCards - visibleCards) {
    index = 0; // Zurück zum Anfang
  }

  gsap.to(marqueeList, {
    x: `-${index * cardWidth}rem`,
    duration: 0.8,
    ease: 'power2.inOut',
  });
}

setInterval(moveMarquee, 2000); // Alle 2 Sekunden
