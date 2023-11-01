import { CustomerSignin } from '@commercetools/platform-sdk';

export default class CustomerData implements CustomerSignin {
  readonly email: string;

  readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
