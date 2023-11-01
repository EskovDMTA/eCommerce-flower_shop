import SwiperListener from './swiper/swiper-listener';
import ProductToCart from './product-to-cart';
import ChangeVisability from './change-visability';
import Toast from '../toast';


export default class ProductListener {
  static addListenerToProductPage() {
    this.addListenerToSizeButtons();
    this.addListenerToQuantityOfProducts();
    this.addListenerToDescriptionOrReview();
    this.addListenerToImageBlock();
    SwiperListener.addListenerToSwiper();
  }

  static addListenerToSizeButtons() {
    const sizeButtonsBlock = document.querySelector(
      '.product-size-block',
    ) as HTMLDivElement;
    const sizeButtons = sizeButtonsBlock.querySelectorAll('button');
    sizeButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        this.toggleActiveState(event, sizeButtons, 'size-active');
      });
    });
  }

  static addListenerToDescriptionOrReview() {
    const descriptionReviewsButtonsBlock = document.querySelector(
      '.product-description-and-reviews-block',
    ) as HTMLDivElement;
    const descriptionReviewsButtons = descriptionReviewsButtonsBlock.querySelectorAll(
      'div',
    );
    descriptionReviewsButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        this.toggleActiveState(event, descriptionReviewsButtons, 'item-active');
      });
    });
  }

  static toggleActiveState = (
    event: Event,
    arrayButtons:
      | NodeListOf<HTMLButtonElement>
      | NodeListOf<HTMLDivElement>
      | NodeListOf<HTMLImageElement>,
    className: string,
  ) => {
    arrayButtons.forEach((button) => {
      button.classList.remove(className);
    });
    const currentButton = event.target as HTMLButtonElement | HTMLDivElement;
    currentButton.classList.add(className);
  };

  static addListenerToQuantityOfProducts() {
    const reduceButton = document.querySelector('.reduce-number');
    const addButton = document.querySelector('.add-quantity');
    if (reduceButton) {
      reduceButton.addEventListener('click', this.handleQuantityOfProducts);
    }
    if (addButton) {
      addButton.addEventListener('click', this.handleQuantityOfProducts);
    }
  }

  static async handleQuantityOfProducts(event: Event) {
    const productToCart = new ProductToCart();
    const countProduct = document.querySelector('.count-product');
    const currentTarget = event.target as HTMLButtonElement;
    try {
      if (countProduct) {
        ChangeVisability.disabledButton(currentTarget);
        if (currentTarget.classList.contains('reduce-number')) {
          const count = +(countProduct.textContent || '0');
          if (count === 1) {
            await productToCart.removeProductFromCart();
            ChangeVisability.hideDeleteBlock();
            Toast.showToast('Product removed from cart', 1000, 'Info');
            ChangeVisability.activeButton(currentTarget);
          }
          if (count > 0) {
            await productToCart.removeProductFromCart();
            countProduct.textContent = (count - 1).toString();
            Toast.showToast('Product reduced in cart', 1000, 'Info');
            ChangeVisability.activeButton(currentTarget);
          }
        } else {
          await productToCart.addProductToCart();
          const count = +(countProduct.textContent || '0');
          countProduct.textContent = (count + 1).toString();
          Toast.showToast('Product added to cart', 1000, 'Info');
          ChangeVisability.activeButton(currentTarget);
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        Toast.showToast(`${e.message}`, 1000, 'Error');
        ChangeVisability.activeButton(currentTarget);
      }
    }
  }

  static addListenerToImageBlock() {
    const imageBlock = document.querySelector(
      '.secondary-product-images-block',
    );
    if (imageBlock) {
      const images = imageBlock.querySelectorAll('img');
      images.forEach((image) => {
        image.addEventListener('click', (event) => {
          this.handleImageBlock(event);
        });
      });
    }
  }

  static handleImageBlock(event: Event) {
    const smallImages = document.querySelectorAll(
      '.secondary-product-image',
    ) as NodeListOf<HTMLImageElement>;
    this.changeImage(event);
    this.toggleActiveState(event, smallImages, 'image-active');
    this.toggleActiveState(event, smallImages, 'image-active');
  }

  static changeImage(event: Event) {
    const smallImage = event.target as HTMLImageElement;
    const mainImage = document.querySelector(
      '.main-image-product',
    ) as HTMLImageElement;
    if (smallImage && mainImage) {
      mainImage.src = smallImage.src;
    }
  }

}
