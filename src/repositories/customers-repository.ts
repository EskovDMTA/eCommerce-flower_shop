import {
  type ApiRoot,
  type CustomerSignInResult,
  type CustomerSignin,
  type CustomerDraft,
  type Customer,
  type ProductPagedQueryResponse,
  createApiBuilderFromCtpClient,
  MyCustomerUpdate,
  MyCustomerChangePassword,
} from '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/sdk-client-v2';
import AppConfiguration from '../app.config';
import ExistingTokenClient from '../client/existing-token-client';
import CommerceToolClient from '../client/commerce-tool-client';
import LocalStorageTokenCache from '../client/local-storage-token-cache';
import ClientCredentialsClient from '../client/client-credentials-client';
import TokenConstants from '../constants/token-constants/token-constants';
import PasswordFlowClientFactory from '../client/pasword-flow-client-factory';


export default class CustomersRepository {
  private passwordFlowApiRoot: ApiRoot | undefined;

  private existingTokenFLowApiRoot: ApiRoot | undefined;

  clientCredentialsClient: ApiRoot | undefined;

  async createCustomer(
    customerData: CustomerDraft
  ): Promise<CustomerSignInResult> {

    this.setupClientCredentialsClient();
    if (!this.clientCredentialsClient) {
      throw Error("Not Authorized");
    }
    const customer = await this.clientCredentialsClient
      .withProjectKey({ projectKey: AppConfiguration.projectKey })
      .customers()
      .post({
        body: customerData,
      })
      .execute();
    return customer.body;
  }

  async loginCustomer(
    customerSignIn: CustomerSignin
  ): Promise<CustomerSignInResult> {
    this.passwordFlowApiRoot = PasswordFlowClientFactory.createInstance(customerSignIn.email, customerSignIn.password)
    const customer = await this.passwordFlowApiRoot
      .withProjectKey({ projectKey: AppConfiguration.projectKey })
      .login()
      .post({
        body: customerSignIn,
      })
      .execute();
    return customer.body;
  }


  async reloginCustomer(
    customerSignIn: CustomerSignin
  ): Promise<CustomerSignInResult> {
    this.logOut()
    this.passwordFlowApiRoot = PasswordFlowClientFactory.createInstance(customerSignIn.email, customerSignIn.password)
    const customer = await (this.passwordFlowApiRoot as ApiRoot)
      .withProjectKey({ projectKey: AppConfiguration.projectKey })
      .login()
      .post({
        body: customerSignIn,
      })
      .execute();
    return customer.body;
  }

  async getCustomerDetails(): Promise<Customer> {
    if (!this.existingTokenFLowApiRoot) {
      this.setupExistingTokenClient();
    }
    if (!this.existingTokenFLowApiRoot) {
      throw Error("Not Authorized");
    }
    const customer = await this.existingTokenFLowApiRoot
      .withProjectKey({ projectKey: AppConfiguration.projectKey })
      .me()
      .get()
      .execute();
    return customer.body;
  }

  async updateCustomerDetails(update: MyCustomerUpdate): Promise<Customer> {
    if (!this.existingTokenFLowApiRoot) {
      this.setupExistingTokenClient();
    }
    if (!this.existingTokenFLowApiRoot) {
      throw Error("Not Authorized");
    }
    const customer = await this.existingTokenFLowApiRoot
      .withProjectKey({ projectKey: AppConfiguration.projectKey })
      .me()
      .post({ body: update })
      .execute();
    return customer.body;
  }


  async updateCustomerPassword(changePassword: MyCustomerChangePassword): Promise<Customer> {
    if (!this.existingTokenFLowApiRoot) {
      this.setupExistingTokenClient();
    }
    if (!this.existingTokenFLowApiRoot) {
      throw Error("Not Authorized");
    }
    const customer = await this.existingTokenFLowApiRoot
      .withProjectKey({ projectKey: AppConfiguration.projectKey })
      .me()
      .password()
      .post({ body: changePassword })
      .execute();
    return customer.body;
  }


  setupExistingTokenClient(): void {
    const tokenStore: TokenStore = new LocalStorageTokenCache(TokenConstants.USER_TOKEN).get();
    if (!tokenStore.token) {
      return;
    }
    this.existingTokenFLowApiRoot = createApiBuilderFromCtpClient(ExistingTokenClient.getClient(tokenStore.token));
  }


  private setupPasswordFlowClient(login?: string, password?: string) {
    if (!this.passwordFlowApiRoot) {
      if (login && password) {
        this.passwordFlowApiRoot = createApiBuilderFromCtpClient(CommerceToolClient.getClient(login, password));
      }
    }
  }

  setupClientCredentialsClient() {
    if (!this.clientCredentialsClient) {
      this.clientCredentialsClient = createApiBuilderFromCtpClient(ClientCredentialsClient.getClient());
    }
  }

  async getProducts(): Promise<ProductPagedQueryResponse> {
    if (!this.clientCredentialsClient) {
      this.setupClientCredentialsClient();
    }
    if (!this.clientCredentialsClient) {
      throw new Error();
    }
    const products = await this.clientCredentialsClient
      .withProjectKey({ projectKey: AppConfiguration.projectKey })
      .products()
      .get()
      .execute();
    return products.body;
  }

  private logOut(){
    this.passwordFlowApiRoot = undefined;
    localStorage.removeItem(TokenConstants.USER_TOKEN);
  }
}

