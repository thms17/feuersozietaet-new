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
    768: {
      spaceBetween: 16, // Von 768px bis 991px
    },
    992: {
      spaceBetween: 32, // Ab 992px wieder auf 32px
    },
  },
});
