import { TokenCache, TokenStore} from '@commercetools/sdk-client-v2';

export default class LocalStorageTokenCache implements TokenCache {
  private readonly storageKey;

  constructor(storageKey: string)
  {
    this.storageKey = storageKey;
  }

  get(): TokenStore {
    const storedToken = localStorage.getItem(this.storageKey);
    if (storedToken) {
      const tokenInfo: TokenStore = JSON.parse(storedToken);
      return tokenInfo;
    }
    return {} as TokenStore
  }

  set(cache: TokenStore): void {
    const tokenString = JSON.stringify(cache);
    localStorage.setItem(this.storageKey, tokenString);
  }
}