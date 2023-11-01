import initSwiper from './index';

export default class SwiperListener {
  static addListenerToSwiper() {
    this.openSwiper();
    this.closeSwiper();
  }

  static openSwiper() {
    const mainImage = document.querySelector('.main-image-product');
    mainImage?.addEventListener('click', () => {
      const currentImageIndex = this.getCurrentImageIndex();
      initSwiper('.swiper-container', currentImageIndex);
      const modal = document.querySelector('.modal') as HTMLDivElement;
      if (modal) {
        modal.classList.add('show');
      }
    });
  }

  static closeSwiper() {
    const closeSwiper = document.querySelector('.close-modal');
    const modal = document.querySelector('.modal') as HTMLDivElement;
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.classList.remove('show');
      }
    });
    closeSwiper?.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  }

  static getCurrentImageIndex() {
    const productImages = document.querySelector(
      '.secondary-product-images-block'
    )?.children as HTMLCollection;
    const currentImageIndex = Array.from(productImages).findIndex((image) =>
      image.classList.contains('image-active')
    );
    return currentImageIndex !== -1 ? currentImageIndex : 0;
  }
}
