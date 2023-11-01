/* eslint-disable class-methods-use-this */
import { DiscountCodePagedQueryResponse,
} from '@commercetools/platform-sdk';
import AppConfiguration from '../app.config';
import ClientFactory from '../business-services/client-factory';

export default class DiscountRepository {
  async getDiscountCodes(): Promise<DiscountCodePagedQueryResponse> {
    const client = await ClientFactory.getClientCredentialsClient();
    const codes = await client
      .withProjectKey({ projectKey: AppConfiguration.projectKey })
      .discountCodes()
      .get({
        queryArgs: {
          limit: 20,
        }
      })
      .execute();
    return codes.body;
  }
}
