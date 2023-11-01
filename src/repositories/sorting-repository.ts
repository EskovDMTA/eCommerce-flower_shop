import {
  ProductProjectionPagedQueryResponse,
  type ApiRoot,
} from '@commercetools/platform-sdk';
import AppConfiguration from '../app.config';
import CustomersRepository from './customers-repository';

export default class SortingRepository {
  private clientCredentialsClient: ApiRoot | undefined;

  private customersRepository: CustomersRepository = new CustomersRepository();

  // async getSorting(sortingText: string): Promise<ProductProjectionPagedQueryResponse> {

  async getSorting(sortParametr: string): Promise<ProductProjectionPagedQueryResponse> {
    if (!this.clientCredentialsClient) {
      this.customersRepository.setupClientCredentialsClient();
      this.clientCredentialsClient = this.customersRepository.clientCredentialsClient;
    }
    if (!this.clientCredentialsClient) {
      throw new Error();
    }
    const sorting = await this.clientCredentialsClient
      .withProjectKey({ projectKey: AppConfiguration.projectKey })
      .productProjections()
      .search()
      .get({
        queryArgs: {
          sort: sortParametr,
          limit: 500,
        }
      })
      .execute();
    return sorting.body;
  }
}