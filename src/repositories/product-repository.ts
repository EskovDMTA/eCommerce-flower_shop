/* eslint-disable class-methods-use-this */
import {
  Product,
  ProductPagedQueryResponse,
} from '@commercetools/platform-sdk';
import AppConfiguration from '../app.config';
import ClientFactory from '../business-services/client-factory';

export default class ProductRepository {
  async getProducts(): Promise<ProductPagedQueryResponse> {
    const client = await ClientFactory.getClientCredentialsClient();
    const products = await client
      .withProjectKey({ projectKey: AppConfiguration.projectKey })
      .products()
      .get({
        queryArgs: {
          limit: 500,
        }
      })

      .execute();
    return products.body;
  }

  async getProduct(productId: string): Promise<Product> {
    const client = await ClientFactory.getClientCredentialsClient();
    const product = await client
      .withProjectKey({ projectKey: AppConfiguration.projectKey })
      .products()
      .withId({ ID: productId })
      .get()
      .execute();
    return product.body;
  }
}
