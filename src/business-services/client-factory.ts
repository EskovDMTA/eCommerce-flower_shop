import { type ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/sdk-client-v2';
import ClientCredentialsClient from '../client/client-credentials-client';
import ExistingTokenClient from '../client/existing-token-client';
import LocalStorageTokenCache from '../client/local-storage-token-cache';
import TokenConstants from '../constants/token-constants/token-constants';
import AnonymousTokenClient from '../client/anonymouse-token-client';

export default class ClientFactory {
  private static clientCredentialsClient: ApiRoot | undefined;

  private static clientExistingTokenClient: ApiRoot | undefined;

  private static anonymousTokenClient: ApiRoot | undefined;


  static getClientCredentialsClient() {
    if (!ClientFactory.clientCredentialsClient) {
      ClientFactory.clientCredentialsClient = createApiBuilderFromCtpClient(ClientCredentialsClient.getClient())
    }
    if (!ClientFactory.clientCredentialsClient) {
      throw new Error('Client credentials client not configured');
    }
    return ClientFactory.clientCredentialsClient;
  }

  static getClientExistingTokenClient(){
    if (!ClientFactory.clientExistingTokenClient) {
      const tokenStore: TokenStore = new LocalStorageTokenCache(TokenConstants.USER_TOKEN).get();
      ClientFactory.clientExistingTokenClient = createApiBuilderFromCtpClient(ExistingTokenClient.getClient(tokenStore.token))
    }
    if (!ClientFactory.clientExistingTokenClient) {
      throw new Error('Client existing token client not configured');
    }
    return ClientFactory.clientExistingTokenClient;
  }

  static getAnonymousTokenClient(){
    if (!ClientFactory.anonymousTokenClient) {
      const tokenStore: TokenStore = new LocalStorageTokenCache(TokenConstants.ANONYMOUS_TOKEN).get();
      console.log(tokenStore.token)
      ClientFactory.anonymousTokenClient = createApiBuilderFromCtpClient(AnonymousTokenClient.getClient())
    }
    if (!ClientFactory.anonymousTokenClient) {
      throw new Error('Anonumous client token client not configured');
    }
    return ClientFactory.anonymousTokenClient;
  }
}
