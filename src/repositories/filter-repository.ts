import {
  ProductProjectionPagedQueryResponse,
  type ApiRoot,
} from '@commercetools/platform-sdk';
import AppConfiguration from '../app.config';
import CustomersRepository from './customers-repository';

export default class FilterRepository {
  private clientCredentialsClient: ApiRoot | undefined;

  private customersRepository: CustomersRepository = new CustomersRepository();

  async getFilter(filterParametr: string | string[]): Promise<ProductProjectionPagedQueryResponse> {
    if (!this.clientCredentialsClient) {
      this.customersRepository.setupClientCredentialsClient();
      this.clientCredentialsClient = this.customersRepository.clientCredentialsClient;
    }
    if (!this.clientCredentialsClient) {
      throw new Error();
    }
    const filtering = await this.clientCredentialsClient
      .withProjectKey({ projectKey: AppConfiguration.projectKey })
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'filter.query': filterParametr,
          limit: 500,
        }
      })
      .execute();
    return filtering.body;
  }
}