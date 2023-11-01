/* eslint-disable class-methods-use-this */
import { LineItem, MyCartRemoveLineItemAction, MyCartUpdateAction } from '@commercetools/platform-sdk';
import CartRepository from '../../repositories/cart-repository';


type MyCartRemoveItem = {
  version: number
  actions: Array<MyCartRemoveLineItemAction>
}


type MyCartUpdate = {
  version: number
  actions: Array<MyCartUpdateAction>
}


export default class ProductToCart {

  cartRepository: CartRepository;

  constructor() {
    this.cartRepository = new CartRepository();
  }

  async addProductToCart() {
    const productDraft = await this.createCartUpdateDraft();
    const cartID = await this.getCartId();
    return this.cartRepository.updateActiveCart(cartID, productDraft);
  }

  async addProductToCartFromCatalog(productId: string){
    const productDraft = await this.createCartUpdateDraftFromCatalog(productId);
    const cartID = await this.getCartId();
    return this.cartRepository.updateActiveCart(cartID, productDraft);
  }

  async removeProductFromCart(count = 1) {
    const removeProductDraft = await this.createRemoveItemDraft(count);
    const cartID = await this.getCartId();
    return this.cartRepository.removeLineItem(cartID, removeProductDraft);
  }

  async createCartUpdateDraft(): Promise<MyCartUpdate> {
    await this.cartRepository.getOrCreateCartForCurrentCustomer()
    const version = await this.getCartVersion()
    const [productId, quantity] = [this.getProductId(), 1]
    const action = 'addLineItem' // default value needed to tell the system we are adding an item to cart
    const variantId = 1
    return {
      version,
      actions: [
        {
          action,
          productId,
          variantId,
          quantity,
        },
      ],
    }
  }

  async createCartUpdateDraftFromCatalog(productID: string): Promise<MyCartUpdate> {
    await this.cartRepository.getOrCreateCartForCurrentCustomer()
    const version = await this.getCartVersion()
    const [productId, quantity] = [productID, 1]
    const action = 'addLineItem' // default value needed to tell the system we are adding an item to cart
    const variantId = 1
    return {
      version,
      actions: [
        {
          action,
          productId,
          variantId,
          quantity,
        },
      ],
    }
  }

  async getCartVersion() {
    try {
      const activeCart = await this.cartRepository.getActiveCart();
      if(activeCart){
        return activeCart?.body.version;
      }
    } catch (e) {
      console.log(e)
    }
    return 0
  }

  async getCartId() {
    try {
      const activeCart = await this.cartRepository.getActiveCart();
      if(activeCart){
        return activeCart?.body.id;
      }
    } catch (e) {
      console.log(e)
      return "0"
    }
    return "0"
  }

  async getProductLineId(){
    const currentCart = await this.cartRepository.getActiveCart();
    const productId = this.getProductId();
    if(currentCart !== null && productId !== undefined) {
      return this.getIdByProductId(currentCart?.body.lineItems, productId)
    }
    return ""
  }

  getIdByProductId(lineItems: LineItem[], productId: string) {
    const foundItem = lineItems.find(item => item.productId === productId);
    return foundItem ? foundItem.id : "0";
  }

  async createRemoveItemDraft(count: number): Promise<MyCartRemoveItem> {
    const action = 'removeLineItem' // default value needed to tell the system we are removing an item from the cart
    const version = await this.getCartVersion()
    const lineItemId =  await this.getProductLineId();
    const quantity = count;
    return {
      version,
      actions: [
        {
          action,
          lineItemId,
          quantity,
        },
      ],
    }
  }

  getProductId() {
    const productId = (document.querySelector(".product-id")) as HTMLButtonElement;
    if (productId) return productId.dataset.id
    return "0"
  }

  getProductCount() {
    const count = document.querySelector(".count-product")
    if (count?.textContent) return +count.textContent
    return 1
  }
}
