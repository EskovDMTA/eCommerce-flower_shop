import { ApiRoot, Cart, CartDraft, ClientResponse, MyCartRemoveLineItemAction, MyCartUpdateAction, MyCartChangeLineItemQuantityAction } from '@commercetools/platform-sdk';
import AppConfiguration from '../app.config';
import UserService from '../business-services/user-service';
import ClientFactory from '../business-services/client-factory';

interface ICart {
  client: ApiRoot | null
  projectKey: string
  getOrCreateCartForCurrentCustomer(cartDraft: CartDraft): object
  getActiveCart(): object
}

type MyCartUpdate = {
  version: number
  actions: Array<MyCartUpdateAction>
}

export type MyCartRemoveItem = {
  version: number
  actions: Array<MyCartRemoveLineItemAction>
}

class CartRepository implements ICart {
  client: ApiRoot

  projectKey: string

  options: CartDraft

  constructor() {
    this.projectKey = AppConfiguration.projectKey
    this.options = {
      currency: "EUR"
    }
    this.client = UserService.isAuthorised ? ClientFactory.getClientExistingTokenClient() : ClientFactory.getAnonymousTokenClient();
  }

  async getOrCreateCartForCurrentCustomer(): Promise<ClientResponse<Cart>> {
    try {
      const cart = await this.getActiveCart();
      if (cart?.statusCode === 200) {
        return cart;
      }
    }
    catch {
      console.log('Error getting active cart. Trying to create new.')
    }
    return this.client
      .withProjectKey({ projectKey: this.projectKey })
      .me()
      .carts()
      .post({
        body: this.options,
      })
      .execute();
  }

  async getActiveCart() {
    try {
      if (this.client) {
        return await this.client
          .withProjectKey({ projectKey: this.projectKey })
          .me()
          .activeCart()
          .get()
          .execute();
      }
    } catch(e) {
      console.log(e)
    }

    return null;
  }

  async updateActiveCart(cartId: string, productDetails: MyCartUpdate) {
    let cartID = cartId;
    const cartUpdateDraft = productDetails
    if (!cartID || cartID === "0") {
      const cart = await this.getOrCreateCartForCurrentCustomer()
      if (typeof cart === "object") {
        cartID = cart.body.id
        cartUpdateDraft.version = cart.body.version
      }
    }
    if (this.client) {
      return this.client
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .carts()
        .withId({ ID: cartID })
        .post({ body: cartUpdateDraft })
        .execute()
    }
    return null;
  }

  async updateLineItemQuantity(cartId: string, cartVersion: number, quantity: number, lineItemId: string): Promise<Cart> {
    const action = { action: 'changeLineItemQuantity', lineItemId, quantity } as MyCartChangeLineItemQuantityAction;
    const cartUpdate = { version: cartVersion, actions: [action] } as MyCartUpdate;

    const response = await this.client
      .withProjectKey({ projectKey: this.projectKey })
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({ body: cartUpdate})
      .execute();

    return response.body;
  }



  async removeLineItem(cartID: string, productDetails: MyCartRemoveItem): Promise<Cart> {
    const response = await this.client
      .withProjectKey({ projectKey: this.projectKey })
      .me()
      .carts()
      .withId({ ID: cartID })
      .post({ body: productDetails })
      .execute();

    return response.body;
  }

  async deleteCart(cartID: string, version: number): Promise<ClientResponse<Cart>> {
    return this.client
      .withProjectKey({ projectKey: this.projectKey })
      .me()
      .carts()
      .withId({ ID: cartID })
      .delete({
        queryArgs: {
          version
        }
      })
      .execute()
  }

  async  applyPromoCodeToCart(promoCode: string, cartId: string, cartVersion:number) {
    const action = {
      "action": "addDiscountCode",
      "code": promoCode
    }
    const cartUpdate = { version: cartVersion, actions: [action] } as MyCartUpdate;
    const response = await this.client
      .withProjectKey({projectKey: this.projectKey})
      .me()
      .carts()
      .withId({ID: cartId})
      .post({body: cartUpdate})
      .execute()
    return response.body
  }
}



export default CartRepository
