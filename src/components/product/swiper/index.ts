/* eslint-disable @typescript-eslint/no-unused-vars */
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

Swiper.use([Navigation]);

export default function initSwiper(swiperClassName: string, currentSlide = 1) {
  const swiper = new Swiper(swiperClassName, {
    initialSlide: currentSlide,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
