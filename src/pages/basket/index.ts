/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "./index.css";
import { Cart, LineItem, MyCartRemoveLineItemAction } from '@commercetools/platform-sdk';
import Page from '../../templates/page';
import CreateElement from "../../templates/constructor";
import CartRepository, { MyCartRemoveItem } from '../../repositories/cart-repository';
import ConfirmationPopup from "../../components/confirmation-popup";
import DiscountRepository from '../../repositories/discount-repository';
import Toast from '../../components/toast';
import Spinner from "../../components/spinner/spinner";

class BasketPage extends Page {
  cart: Cart | undefined

  spinner: Spinner;

  constructor(id: string) {
    super(id)
    this.spinner = new Spinner()
  }

  static TextObject = {
    MainTitle: 'Basket Page',
  };

  async init(): Promise<void> {

    const cartRepo = new CartRepository();
    this.cart = (await cartRepo.getOrCreateCartForCurrentCustomer())?.body

  }

  buildLineItems(productTable: HTMLElement) {
    this.cart?.lineItems.forEach(lineItem => {
      const productLine = new CreateElement('tr', [`line${lineItem.id}`]).appendTo(productTable);
      const productInfo = new CreateElement('td', [`product-info`]).appendTo(productLine);
      const productImg = new CreateElement('img', ['product-img'],
        [{ prop: 'src', value: lineItem.variant.images ? lineItem.variant.images[0].url : '' }],)
        .appendTo(productInfo);
      const productName = new CreateElement('span', ['product-basket-name'], [], lineItem.name.en).appendTo(productInfo);
      const productPrice = new CreateElement('td', [`product-basket-price`], [],
        BasketPage.resolveProductPrice(lineItem))
        .appendTo(productLine);
      const productQty = new CreateElement('td', [`product-qty`]).appendTo(productLine);
      const productQtyContainer = new CreateElement('div', [`product-qty-container`]).appendTo(productQty);
      const productMinus = new CreateElement('div', [`product-qty-minus`], [{ prop: 'id', value: `${lineItem.id}` }], `-`).appendTo(productQtyContainer);
      const productNumber = new CreateElement('span', [`product-qty-number`], [], `${lineItem.quantity}`).appendTo(productQtyContainer);
      if (productNumber.textContent === '1') {
        productMinus.setAttribute('disabled', 'true');
      }
      const productPlus = new CreateElement('div', [`product-qty-plus`], [{ prop: 'id', value: `${lineItem.id}` }], `+`).appendTo(productQtyContainer);
      const productTotal = new CreateElement('td', [`product-total`], [],
        `${this.cart ? (lineItem.price.value.centAmount / 100 * lineItem.quantity).toFixed(2) : "0"} ${lineItem.totalPrice.currencyCode}`)
        .appendTo(productLine);
      const productDelete = new CreateElement('td', [`product-delete`], [{ prop: 'id', value: `${lineItem.id}` }], '✖').appendTo(productLine);
      productDelete.addEventListener('click', async (event) => {
        const repo = new CartRepository();
        if (this.cart) {
          const { id } = event.target as HTMLElement;

          this.cart = await repo.removeLineItem(this.cart?.id, { version: this.cart.version, actions: [{ action: "removeLineItem", lineItemId: id } as MyCartRemoveLineItemAction] } as MyCartRemoveItem);
          BasketPage.clearTable(productTable as HTMLTableElement);
          this.buildLineItems(productTable as HTMLElement);
          this.ensureClearButton()
          this.ensureEmptyBasketMessage();
          this.updateTotalMenu();
        }
      })

      const changeQuantityTimeout: NodeJS.Timeout | undefined = undefined
      this.addMinusBtnListener(productMinus, productNumber, changeQuantityTimeout)
      this.addPlusBtnListener(productPlus, productNumber, productMinus, changeQuantityTimeout)
    });
}

  addMinusBtnListener(productMinus: HTMLElement, productNumber: HTMLElement, changeQuantityTimeout?: NodeJS.Timeout): void {
    productMinus.addEventListener('click', async (event) => {
      if (productNumber.textContent && Number(productNumber.textContent) > 1) {
        const quantity = (Number(productNumber.textContent) - 1);
        if (quantity === 1) {
          productMinus.setAttribute('disabled', 'true');
        }
        productNumber.textContent = quantity.toString();
        const repo = new CartRepository();
        const { id } = event.target as HTMLElement;
        const targetElement = document.querySelector('.basket-total');
        if (targetElement) {
          this.spinner.show(targetElement as HTMLElement);
        }
        clearTimeout(changeQuantityTimeout);
        this.updateLineTotal(id, quantity);
        changeQuantityTimeout = setTimeout(async () => {
          if (this.cart) {
            this.cart = await repo.updateLineItemQuantity(this.cart?.id, this.cart?.version, quantity, id);
            this.updateTotalMenu();
            this.spinner.hide();
          }
        }, 300);
      }
    })
  }


  addPlusBtnListener(productPlus: HTMLElement, productNumber: HTMLElement, productMinus: HTMLElement, changeQuantityTimeout?: NodeJS.Timeout): void {

    productPlus.addEventListener('click', async (event) => {
      if (productNumber.textContent) {
        const quantity = (Number(productNumber.textContent) + 1);
        if (quantity === 2) {
          productMinus.removeAttribute('disabled');
        }
        productNumber.textContent = quantity.toString();
        const repo = new CartRepository();
        const { id } = event.target as HTMLElement;
        if (this.cart) {
          const targetElement = document.querySelector('.basket-total');
          if (targetElement) {
            this.spinner.show(targetElement as HTMLElement);
          }

          clearTimeout(changeQuantityTimeout);
          this.updateLineTotal(id, quantity);
          changeQuantityTimeout = setTimeout(async () => {
            if (this.cart) {
              this.cart = await repo.updateLineItemQuantity(this.cart?.id, this.cart?.version, quantity, id);
              this.updateTotalMenu();
              this.spinner.hide();
            }
          }, 300);
        }
      }
    })
  }

  buildTotalMenu(basketTotal: HTMLElement) {
    const basketCoupon = new CreateElement('div', ['basket-total-coupon']).appendTo(basketTotal);
    const couponLabel = new CreateElement('label', ['coupon-label'], [{ prop: 'for', value: 'coupon-input' }], 'Coupon Apply').appendTo(basketCoupon);
    const couponInput = new CreateElement('input', ['coupon-input'], [{ prop: 'id', value: 'coupon-input' }, { prop: 'placeholder', value: 'Enter coupon code here' }]).appendTo(basketCoupon);
    const couponBtn = new CreateElement('button', ['coupon-btn'], [], 'Apply').appendTo(basketCoupon);
    couponBtn.addEventListener("click", async () => {
      const repo = new CartRepository();
      const repoDiscount = new DiscountRepository();
      if (this.cart) {
        const input = document.querySelector('.coupon-input') as HTMLInputElement;
        try {
          this.cart = await repo.applyPromoCodeToCart(input.value, this.cart?.id, this.cart?.version);
          Toast.showToast(`Discount coupon ${input.value} successfully applied`, 2000, 'Info')
          this.updateTotalMenu();
        } catch (e) {
          if (e instanceof Error) {
            Toast.showToast(`${e.message}`, 1000, 'Error');
          }
        }

      }
    })
    const basketSubtotal = new CreateElement('div', ['basket-total-subtotal']).appendTo(basketTotal);
    const subtotalTitle = new CreateElement('p', ['subtotal-title'], [], 'Subtotal').appendTo(basketSubtotal);
    const subtotalPrice = new CreateElement('p', ['subtotal-price'], [], this.getSubtotalPrice()).appendTo(basketSubtotal);
    const basketDiscount = new CreateElement('div', ['basket-total-discount']).appendTo(basketTotal);
    const discountTitle = new CreateElement('p', ['discount-title'], [], 'Coupon Discount').appendTo(basketDiscount);
    const discountPrice = new CreateElement('p', ['discount-price'], [], this.getDiscount()).appendTo(basketDiscount);
    const basketTotalPrice = new CreateElement('div', ['basket-total-price']).appendTo(basketTotal);
    const totalTitle = new CreateElement('p', ['discount-title'], [], 'Total').appendTo(basketTotalPrice);
    const totalPrice = new CreateElement('p', ['discount-price'], [], this.getDiscountPrice()).appendTo(basketTotalPrice);
    const orderBtn = new CreateElement('button', ['order-btn'], [], 'Proceed To Checkout').appendTo(basketTotal);
  }

  updateTotalMenu() {
    const basketSubtotal = document.querySelector('.subtotal-price');
    const discount = document.querySelector('.basket-total-discount .discount-price');
    const totalPrice = document.querySelector('.basket-total-price .discount-price');
    if (basketSubtotal) {
      basketSubtotal.textContent = this.getSubtotalPrice()
    }
    if (totalPrice) {
      totalPrice.textContent = this.getDiscountPrice();
    }
    if (discount) {
      discount.textContent = this.getDiscount()
    }
  }

  updateLineTotal(id: string, quantity: number) {
    const existingLine = this.cart?.lineItems.find(x => x.id === id);
    if (existingLine) {
      const productTotal = document.querySelector(`.line${id} .product-total`) as HTMLElement;
      if (productTotal) {
        productTotal.textContent = `${(BasketPage.resolveProductPriceQty(existingLine) * quantity).toFixed(2)} ${existingLine.price.value.currencyCode}`;
      }
    }
  }

  getDiscount() {
    return `${(parseFloat(this.getSubtotalPrice()) - parseFloat(this.getDiscountPrice())).toFixed(2)} ${this.cart ? this.cart.totalPrice.currencyCode : ''}`
  }

  getDiscountPrice() { return `${this.cart ? (this.cart.totalPrice.centAmount / 100).toFixed(2) : '0'} ${this.cart ? this.cart.totalPrice.currencyCode : ''}` }

  getSubtotalPrice() {
    return `${this.cart ? (this.cart?.lineItems.reduce((accumulator, elem) => accumulator + (elem.price.value.centAmount / 100 * elem.quantity), 0))?.toFixed(2) : '0'} ${this.cart ? this.cart.totalPrice.currencyCode : ''}`
  }

  renderPage(): void {
    const basketSection = new CreateElement('section', ['basket-section']).appendTo(this.container);

    const basketTableContainer = new CreateElement('div', ['basket-table-container']).appendTo(basketSection);
    const productTable = new CreateElement('table', ['basket-product-table']).appendTo(basketTableContainer);
    const productTableHead = new CreateElement('thead', ['product-table_head']).appendTo(productTable);
    const productTableHeadElement = new CreateElement('tr', ['product-table_head_element']).appendTo(productTableHead);
    new CreateElement('th', ['product-table_name'], [], 'Product').appendTo(productTableHead);
    new CreateElement('th', ['product-table_price'], [], 'Price').appendTo(productTableHead);
    new CreateElement('th', ['product-table_quantity'], [], 'Quantity').appendTo(productTableHead);
    new CreateElement('th', ['product-table_total'], [], 'Total').appendTo(productTableHead);
    new CreateElement('th', ['product-service']).appendTo(productTableHead);
    const basketTotal = new CreateElement('div', ['basket-total']).appendTo(basketSection);
    this.buildLineItems(productTable);
    this.buildTotalMenu(basketTotal);
    this.ensureEmptyBasketMessage(basketTableContainer);

    if (this.cart?.lineItems.length !== 0 || !this.cart) {
      const clearBtn = new CreateElement('button', ['basket-clear-btn'], [], 'Clear Shopping Cart').appendTo(basketTableContainer);
      clearBtn.addEventListener('click', () => {
        const confirmationPopup = new ConfirmationPopup();
        confirmationPopup.open(async () => {
          const repo = new CartRepository();
          if (this.cart) {
            await repo.deleteCart(this.cart?.id, this.cart?.version)
            this.cart = (await repo.getOrCreateCartForCurrentCustomer())?.body;
            BasketPage.clearTable(productTable as HTMLTableElement)
            this.ensureClearButton(clearBtn)
            this.ensureEmptyBasketMessage(basketTableContainer);
            this.updateTotalMenu();
          }
        });
      });
    }
  }

  ensureEmptyBasketMessage(basketTableContainer?: HTMLElement) {
    const container = basketTableContainer || document.querySelector('.basket-table-container') as HTMLElement;
    if (!this.cart || this.cart?.lineItems.length === 0) {
      const emptyMessageContainer = new CreateElement('div', ['basket-empty-message-container']).appendTo(container);
      const emptyMessage = new CreateElement('div', ['empty-message'], [], 'The cart is empty. You can continue selecting your favourite products in ').appendTo(emptyMessageContainer);
      new CreateElement('a', ['catalog-link'], [{ prop: 'href', value: `#catalog-page` }], 'Catalog').appendTo(emptyMessage);
    }
  }

  ensureClearButton(clearBtn?: HTMLElement) {
    const button = clearBtn || document.querySelector('.basket-clear-btn') as HTMLElement;
    if (!this.cart || (this.cart && this.cart.lineItems.length === 0)) {
      button.remove();
    }
  }

  static clearTable(table: HTMLTableElement) {
    while (table.rows.length > 0) {
      table.deleteRow(0);
    }
  }

  render() {
    this.renderPage();
    return this.container;
  }


  private static resolveProductPrice(lineItem: LineItem) {
    if (lineItem.price.discounted?.value.centAmount) {
      return `${(lineItem.price.discounted.value.centAmount / 100).toFixed(2)} ${lineItem.price.value.currencyCode}`;
    }
    return `${(lineItem.price.value.centAmount / 100).toFixed(2)} ${lineItem.price.value.currencyCode}`;
  }

  private static resolveProductPriceQty(lineItem: LineItem) {
    if (lineItem.price.discounted?.value.centAmount) {
      return lineItem.price.discounted.value.centAmount / 100;
    }
    return lineItem.price.value.centAmount / 100;
  }

  private static resolveImgPath(lineItem: LineItem) {
    if (lineItem.variant.images) {
      const keys = Object.keys(lineItem.variant.images);
      if (keys.length > 0) {
        const firstValue = lineItem.variant.images[0];
      }
    }
  }
}

export default BasketPage;
