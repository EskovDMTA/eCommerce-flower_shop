import { AuthMiddlewareOptions, ClientBuilder, HttpMiddlewareOptions } from "@commercetools/sdk-client-v2";
import AppConfiguration from "../app.config";
import LocalStorageTokenCache from "./local-storage-token-cache";
import TokenConstants from "../constants/token-constants/token-constants";

export default class AnonymousTokenClient{

    static getClient() {
        const options: AuthMiddlewareOptions = {
          host: AppConfiguration.commerceServiceAuthUrl,
          projectKey: AppConfiguration.projectKey,
          credentials: {
            clientId: AppConfiguration.clientId,
            clientSecret: AppConfiguration.clientSecret,
          },
          tokenCache: new LocalStorageTokenCache(TokenConstants.ANONYMOUS_TOKEN)
        }
    
        const httpMiddlewareOptions: HttpMiddlewareOptions = {
          host: AppConfiguration.commerceServiceApiUrl,
        };
    
       return new ClientBuilder()
          .withProjectKey(AppConfiguration.projectKey)
          .withAnonymousSessionFlow(options)
          .withHttpMiddleware(httpMiddlewareOptions)
          .build();
    }
}