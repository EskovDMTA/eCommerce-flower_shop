import { Client, ClientBuilder, ExistingTokenMiddlewareOptions, HttpMiddlewareOptions } from "@commercetools/sdk-client-v2";
import AppConfiguration from "../app.config";

export default class ExistingTokenClient {

  static client = new ClientBuilder();

  static getClient(token: string): Client {

    const options: ExistingTokenMiddlewareOptions = {
      force: true
    }
    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: AppConfiguration.commerceServiceApiUrl,
    };

    const client = new ClientBuilder().withExistingTokenFlow(`Bearer ${token}`, options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build()
    return client;
  }
}