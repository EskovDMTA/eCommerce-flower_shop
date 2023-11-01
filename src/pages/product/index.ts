/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import './index.css';
import { Cart, ErrorObject, LineItem } from '@commercetools/platform-sdk';
import Page from '../../templates/page';
import CreateElement from '../../templates/constructor';
import ProductListener from '../../components/product/product-listener';
import {
  ParsingProduct,
  ProductParsing,
} from '../../components/product/parsing-product';
import ProductRepository from '../../repositories/product-repository';
import CartRepository from '../../repositories/cart-repository';
import ProductToCart from '../../components/product/product-to-cart';
import ChangeVisability from '../../components/product/change-visability';
import Toast from '../../components/toast';

class ProductPage extends Page {
  productRepository: ProductRepository;

  cartRepository: CartRepository;

  product: ParsingProduct;

  cart: Cart;

  lineItem: LineItem[];

  static TextObject = {
    MainTitle: 'Product',
  };

  constructor(id: string) {
    super(id);
    this.productRepository = new ProductRepository();
    this.cartRepository = new CartRepository();
    this.product = {} as ParsingProduct;
    this.cart = {} as Cart;
    this.lineItem = {} as LineItem[];
  }

  renderPage() {
    const productSection = new CreateElement('section', [
      'product-section',
    ]).appendTo(this.container);

    const mainHomeBlock = new CreateElement('div', [
      'main-home-block',
    ]).appendTo(productSection);
    const mainBlock = new CreateElement(
      'a',
      ['main-item'],
      [
        {
          prop: 'href',
          value: '#catalog-page',
        },
      ],
      'Catalog'
    ).appendTo(mainHomeBlock);
    const homeBlock = new CreateElement(
      'a',
      ['shop-item'],
      [
        {
          prop: 'href',
          value: '#main-page',
        },
      ],
      'Main'
    ).appendTo(mainHomeBlock);

    const aboutProductBlock = new CreateElement(
      'div',
      ['about-product-block'],
      []
    ).appendTo(productSection);

    const productImagesBlock = new CreateElement('div', [
      'product-images-block',
    ]).appendTo(aboutProductBlock);

    const secondaryImages = new CreateElement('div', [
      'secondary-product-images-block',
    ]).appendTo(productImagesBlock);

    const mainImagesBlock = new CreateElement('div', [
      'main-images-block',
    ]).appendTo(productImagesBlock);
    const mainImages = new CreateElement(
      'img',
      ['main-image-product'],
      [
        {
          prop: 'src',
          value: this.product.images[0],
        },
      ]
    ).appendTo(mainImagesBlock);

    const detailsProductSection = new CreateElement('div', [
      'product-description-block',
    ]).appendTo(aboutProductBlock);
    const productName = new CreateElement(
      'h3',
      ['product-name'],
      [],
      `${this.product.name}`
    ).appendTo(detailsProductSection);

    const priceBlock = new CreateElement(
      'span',
      ['product-price-block'],
      []
    ).appendTo(detailsProductSection);

    const productPrice = new CreateElement(
      'span',
      ['product-price'],
      [],
      `€ ${this.product.price}`
    ).appendTo(priceBlock);
    if (this.product.salePrice) {
      const productSalePrice = new CreateElement(
        'span',
        ['product-price'],
        [],
        `€ ${this.product.salePrice}`
      ).appendTo(priceBlock);
      productPrice.style.textDecoration = 'line-through';
    }
    priceBlock.append(productPrice);

    const shortDescriptionTitle = new CreateElement(
      'span',
      ['product-short-description-title'],
      [],
      `Short description:`
    ).appendTo(detailsProductSection);
    const productShortDescription = new CreateElement(
      'span',
      ['product-short-description'],
      [],
      `${this.product.shortDescription}`
    ).appendTo(detailsProductSection);

    const sizeTitle = new CreateElement(
      'span',
      ['product-size-title'],
      [],
      'Size'
    ).appendTo(detailsProductSection);
    const productSizeBlock = new CreateElement('div', [
      'product-size-block',
    ]).appendTo(detailsProductSection);
    const sizeButtonS = new CreateElement(
      'button',
      ['size-button-s', 'size-active'],
      [],
      'S'
    ).appendTo(productSizeBlock);
    const toCartBlock = new CreateElement('div', ['buy-buttons-block']).appendTo(
      detailsProductSection
    );
    const deleteBlock = new CreateElement('div', ["delete-block", 'display-none']).appendTo(toCartBlock);
    const buyBlock = new CreateElement('div', ["buy-block", 'display-none']).appendTo(toCartBlock);


      const reduceNumberButton = new CreateElement(
        'button',
        ['reduce-number'],
        [],
        '-'
      ).appendTo(deleteBlock);
      let quantityFromBasket = 0
      if(this.lineItem[0]?.quantity){
        quantityFromBasket = this.lineItem[0].quantity
      }
      const countProduct = new CreateElement(
        'div',
        ['count-product'],
        [],
        `${quantityFromBasket}`
      ).appendTo(deleteBlock);
      const addQuantityButton = new CreateElement(
        'button',
        ['add-quantity'],
        [],
        '+'
      ).appendTo(deleteBlock);
      const deleteFromBasket = new CreateElement(
        'button',
        ['product-id', 'delete-from-basket'],
        [{ prop: 'data-id', value: this.product.id }],
        'DELETE FROM BASKET'
      ).appendTo(deleteBlock);
      deleteFromBasket.addEventListener("click", this.handleDeleteButton)
      const buyNowButton = new CreateElement(
        'button',
        ['product-id', 'buy-now'],
        [{ prop: 'data-id', value: this.product.id }],
        'BUY NOW'
      ).appendTo(buyBlock);
      buyNowButton.addEventListener("click", this.handleBuyButton)
    const skuBlock = new CreateElement('div', ['sku-block']).appendTo(
      detailsProductSection
    );
    const skuTitle = new CreateElement(
      'span',
      ['sku-title'],
      [],
      'SKU:'
    ).appendTo(skuBlock);
    const skuValue = new CreateElement(
      'span',
      ['sku-value'],
      [],
      `${this.product.sku}`
    ).appendTo(skuBlock);

    const tagsBlock = new CreateElement('div', ['tags-block']).appendTo(
      detailsProductSection
    );
    const tagsTitle = new CreateElement(
      'span',
      ['tags-title'],
      [],
      'Tags:'
    ).appendTo(tagsBlock);
    const tagsBlockValueContainer = new CreateElement(
      'span',
      ['tags-value'],
      [],
      'Plants'
    ).appendTo(tagsBlock);

    const shareBlock = new CreateElement('div', ['share-block']).appendTo(
      detailsProductSection
    );
    const shareTitle = new CreateElement(
      'span',
      ['share-title'],
      [],
      'Share with friends:'
    ).appendTo(shareBlock);
    const shareProduct = new CreateElement('div', [
      'share-social-block',
    ]).appendTo(shareBlock);

    const productDescriptionAndReviewsBlock = new CreateElement('div', [
      'product-description-and-reviews-block',
    ]).appendTo(productSection);
    const productDescription = new CreateElement(
      'div',
      ['product-description-button', 'item-active'],
      [],
      'Product Description'
    ).appendTo(productDescriptionAndReviewsBlock);
    const productReviews = new CreateElement(
      'div',
      ['product-reviews-button'],
      [],
      'Reviews'
    ).appendTo(productDescriptionAndReviewsBlock);
    const productDescriptionBlock = new CreateElement(
      'div',
      ['product-full-description'],
      [],
      `${this.product.description}`
    ).appendTo(productSection);
    const modal = new CreateElement('div', ['modal']).appendTo(this.container);
    const modalContent = new CreateElement('div', ['modal-content']).appendTo(
      modal
    );
    const closeModal = new CreateElement('div', ['close-modal']).appendTo(
      modalContent
    );
    const swiperContainer = new CreateElement(
      'div',
      ['swiper-images', 'swiper-container'],
      []
    ).appendTo(modalContent);
    const swiperWrapper = new CreateElement(
      'div',
      ['swiper-wrapper'],
      []
    ).appendTo(swiperContainer);
    const swiperButtonNext = new CreateElement(
      'div',
      ['swiper-button-next', 'navigation-item'],
      []
    ).appendTo(swiperContainer);
    const swiperButtonPrev = new CreateElement(
      'div',
      ['swiper-button-prev', 'navigation-item'],
      []
    ).appendTo(swiperContainer);

    this.product.images.forEach((image, index) => {
      let classListSecondaryImage;
      if (index === 0) {
        classListSecondaryImage = ['secondary-product-image', 'image-active'];
      } else {
        classListSecondaryImage = ['secondary-product-image'];
      }
      new CreateElement('img', classListSecondaryImage, [
        {
          prop: 'src',
          value: image,
        },
      ]).appendTo(secondaryImages);
      const swiperImages = new CreateElement(
        'div',
        ['swiper-slide'],
        []
      ).appendTo(swiperWrapper);
      const imageContainer = new CreateElement(
        'div',
        ['image-slider-container'],
        []
      ).appendTo(swiperImages);
      new CreateElement('img', [], [{ prop: 'src', value: image }]).appendTo(
        imageContainer
      );
    });
  }

  addListeners() {
    ProductListener.addListenerToProductPage();
  }

  displayBuyOrDeleteBlock() {
    if(this.cart.lineItems.find((lineItem) => lineItem.productId === this.product.id)){
      this.container.querySelector('.delete-block')?.classList.remove('display-none');
      ((this.container.querySelector('.delete-block')) as HTMLDivElement).style.display = "flex"
    } else {
      this.container.querySelector('.buy-block')?.classList.remove('display-none');
    }
  }

  render() {
    this.renderPage();
    this.displayBuyOrDeleteBlock();
    return this.container;
  }

  async init(): Promise<void> {
    const productId = window.location.hash.split('/')[1];
    const product = await this.productRepository.getProduct(productId);
    const cart = await this.cartRepository.getOrCreateCartForCurrentCustomer();
    if (product) {
      this.product = new ProductParsing(product).getParsingProduct();
    }
    if (cart) {
      this.cart = cart.body;
      this.lineItem = this.cart.lineItems.filter((item) =>item.productId === this.product.id);
    }
  }

  async handleDeleteButton(event:Event){
    const buttonDelete = event.target as HTMLButtonElement;
    ChangeVisability.disabledButton(buttonDelete);
    try {
      const count = document.querySelector(".count-product")?.textContent;
      if(count) {
        await new ProductToCart().removeProductFromCart(+count);
        ChangeVisability.hideDeleteBlock();
      }
    } catch (e){
      if (e instanceof Error) {
        Toast.showToast(`${e.message}`, 1000, 'Error');
        ChangeVisability.activeButton(buttonDelete);
      }
    }
  }

  async handleBuyButton(event:Event){
    const buttonBuy = event.target as HTMLButtonElement;
    ChangeVisability.disabledButton(buttonBuy);
    try {
      await new ProductToCart().addProductToCart();
      Toast.showToast("Product added to cart", 1000, 'Info')
      ChangeVisability.hideBuyBlock()
    } catch (e) {
      if (e instanceof Error) {
        Toast.showToast(`${e.message}`, 1000, 'Error')
        ChangeVisability.activeButton(buttonBuy);
      }
    }
  }
}


export default ProductPage;
