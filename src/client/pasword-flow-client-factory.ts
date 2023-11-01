import { ApiRoot, createApiBuilderFromCtpClient } from "@commercetools/platform-sdk"
import CommerceToolClient from "./commerce-tool-client";

export default class PasswordFlowClientFactory {
    static client: ApiRoot;

    static createInstance(email:string, password: string): ApiRoot {    
        this.client = createApiBuilderFromCtpClient(CommerceToolClient.getClient(email, password));
        return this.client;
    }

}