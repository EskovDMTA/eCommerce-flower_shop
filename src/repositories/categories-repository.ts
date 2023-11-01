import {
  type ApiRoot,
  type CategoryPagedQueryResponse,
} from '@commercetools/platform-sdk';
import AppConfiguration from '../app.config';
import CustomersRepository from './customers-repository';

export default class CategoriesRepository {
  private clientCredentialsClient: ApiRoot | undefined;

  private customersRepository: CustomersRepository = new CustomersRepository();

  async getCategories(): Promise<CategoryPagedQueryResponse> {
    if (!this.clientCredentialsClient) {
      this.customersRepository.setupClientCredentialsClient();
      this.clientCredentialsClient = this.customersRepository.clientCredentialsClient;
    }
    if (!this.clientCredentialsClient) {
      throw new Error();
    }
    const categories = await this.clientCredentialsClient
      .withProjectKey({ projectKey: AppConfiguration.projectKey })
      .categories()
      .get({
        queryArgs: {
          limit: 3,
        }
      }).
      execute();
    return categories.body;
  }
}