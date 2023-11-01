import {
  ProductProjectionPagedQueryResponse,
  type ApiRoot,
} from '@commercetools/platform-sdk';
import AppConfiguration from '../app.config';
import CustomersRepository from './customers-repository';

export default class SearchRepository {
  private clientCredentialsClient: ApiRoot | undefined;

  private customersRepository: CustomersRepository = new CustomersRepository();

  async getSearch(searchText: string): Promise<ProductProjectionPagedQueryResponse> {
    if (!this.clientCredentialsClient) {
      this.customersRepository.setupClientCredentialsClient();
      this.clientCredentialsClient = this.customersRepository.clientCredentialsClient;
    }
    if (!this.clientCredentialsClient) {
      throw new Error();
    }
    const search = await this.clientCredentialsClient
      .withProjectKey({ projectKey: AppConfiguration.projectKey })
      .productProjections()
      .search()
      .get({
        queryArgs: {
          "text.en": searchText,
          limit: 500,
        }
      })
      .execute();
    return search.body;
  }
}