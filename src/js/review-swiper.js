import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const swiper = new Swiper('.swiper', {
  modules: [Autoplay, Pagination],
  slidesPerView: 3,
  spaceBetween: 32, // Standardwert
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  loop: true,
  speed: 800,
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 3, // Ab 768px wieder drei Slides
      spaceBetween: 16,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  },
});
