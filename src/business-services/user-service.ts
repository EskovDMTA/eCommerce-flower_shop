import LocalStorageTokenCache from "../client/local-storage-token-cache";
import TokenConstants from "../constants/token-constants/token-constants";

export default class UserService {
    private static subscribers: (() => void)[] = [];

    static isAuthorised = false;

    static init() {
        const tokenCache = new LocalStorageTokenCache(TokenConstants.USER_TOKEN).get();
        if (tokenCache.token) {
            this.isAuthorised = true;
        }
    }

    static update() {
        const isAuthorisedPreviousValue = this.isAuthorised;
        const tokenCache = new LocalStorageTokenCache(TokenConstants.USER_TOKEN).get();
        if (tokenCache.token) {
            this.isAuthorised = true;
        } else {
            this.isAuthorised = false;
        }
        if (isAuthorisedPreviousValue !== this.isAuthorised) {
            this.notify();
        }
    }


    static subscribeToAuthorizationStatusChanged(calback: () => void) {
        this.subscribers.push(calback);
    }

    static notify() {
        this.subscribers.forEach(subscriber => {
            subscriber();
        });
    }

}