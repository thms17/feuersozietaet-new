import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const swiper = new Swiper('.swiper', {
  modules: [Autoplay, Pagination],
  slidesPerView: 3,
  spaceBetween: 30,
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
});
