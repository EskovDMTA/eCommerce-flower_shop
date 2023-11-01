import RegistrationFormError from './validation-error/registration-form-error';
import DocumentDataFetcher from '../../helpers/document-data-fetcher';
import { AddressType } from './validation-error/interfaces';

export default class CityValidation {
  static VALIDATION_ERRORS = {
    city: 'Must contain at least one character and no special characters or numbers',
  }

  static validateCity(address: AddressType = 'shipping') {
    RegistrationFormError.removeCityInvalidBackground(address);
    const errors = [];
    if(!this.checkCityName(address)){
      errors.push(this.VALIDATION_ERRORS.city);
    }
    if (errors.length !== 0) {
      RegistrationFormError.cityErrors(errors, address);
      return false;
    }
    RegistrationFormError.cityErrors(errors, address);
    return true;
  }

  static checkCityName(address: AddressType) {
    let city;
    if(address === "shipping"){
      city = DocumentDataFetcher.getCityFromRegisterForm();
    }else {
      city = DocumentDataFetcher.getBillingCityFromRegisterForm();
    }
    const regularPattern = /^[A-Za-z]+\s?[A-Za-z]*$/;
    return regularPattern.test(city);
  }
}
