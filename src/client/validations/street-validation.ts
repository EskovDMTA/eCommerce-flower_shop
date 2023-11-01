import RegistrationFormError from './validation-error/registration-form-error';
import DocumentDataFetcher from '../../helpers/document-data-fetcher';
import { AddressType } from './validation-error/interfaces';

export default class StreetValidation {
  static VALIDATION_ERRORS = {
    street: 'Must be at least 1 character',
  }

  static validateStreet(address: AddressType = 'shipping') {
    RegistrationFormError.removeStreetInvalidBackground(address);
    const errors = [];
    if(!this.checkStreetName(address)){
      errors.push(this.VALIDATION_ERRORS.street);
    }
    if (errors.length !== 0) {
      RegistrationFormError.streetErrors(errors, address);
      return false;
    }
    RegistrationFormError.streetErrors(errors, address);
    return true;
  }

  static checkStreetName(address: AddressType) {
    let street;
    if(address === "shipping"){
      street = DocumentDataFetcher.getStreetFromRegisterForm();
    } else {
      street = DocumentDataFetcher.getBillingStreetFromRegisterForm();
    }
    const regularPattern = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>_-]+$/;
    return regularPattern.test(street);
  }
}
