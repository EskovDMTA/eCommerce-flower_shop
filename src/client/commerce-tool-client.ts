import {
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions
} from '@commercetools/sdk-client-v2';
import AppConfiguration from '../app.config';
import LocalStorageTokenCache from './local-storage-token-cache';
import TokenConstants from '../constants/token-constants/token-constants';

export default class CommerceToolClient {
  static getClient(email: string, password: string) {
    const options: PasswordAuthMiddlewareOptions = {
      host: AppConfiguration.commerceServiceAuthUrl,
      projectKey: AppConfiguration.projectKey,
      credentials: {
        clientId: AppConfiguration.clientId,
        clientSecret: AppConfiguration.clientSecret,
        user: {
          username: email,
          password,
        },
      },
      tokenCache: new LocalStorageTokenCache(TokenConstants.USER_TOKEN)
    }

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: AppConfiguration.commerceServiceApiUrl,
    };

    return new ClientBuilder()
      .withProjectKey(AppConfiguration.projectKey)
      .withPasswordFlow(options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
  }
}
