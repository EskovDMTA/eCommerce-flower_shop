import validator from 'validator';
import RegistrationFormError from './validation-error/registration-form-error';
import DocumentDataFetcher from '../../helpers/document-data-fetcher';
import PostalCodeLocale = validator.PostalCodeLocale;
import { AddressType } from './validation-error/interfaces';

export default class PostCodeValidation {
  static VALIDATION_ERRORS = {
    postalCode: 'The postal code is not valid in the country you selected',
  }

  static validatePostalCode(country= false, address: AddressType = 'shipping') {
    if(!country){
      RegistrationFormError.removePostCodeInvalidBackground(address);
    }
    const errors = [];
    if(!this.checkPostalCode(address)){
      errors.push(this.VALIDATION_ERRORS.postalCode);
    }
    if (errors.length !== 0) {
      RegistrationFormError.postalCodeErrors(errors, address);
      return false;
    }
    RegistrationFormError.postalCodeErrors(errors, address);
    return true;
  }

  static checkPostalCode(address: AddressType) {
    let postalCode;
    let countryName;
    if (address === "shipping"){
      postalCode = DocumentDataFetcher.getPostalCodeFromRegisterForm();
      countryName = DocumentDataFetcher.getCountryFromRegisterForm();
    } else {
      postalCode = DocumentDataFetcher.getBillingPostalCodeFromRegisterForm();
      countryName = DocumentDataFetcher.getBillingCountryFromRegisterForm();
    }
    const countryISO2 = countryName as PostalCodeLocale;
    if (this.validatePostalCodeLocale(countryISO2)) {
      return validator.isPostalCode(postalCode, countryISO2);
    }
      return validator.isPostalCode(postalCode, "any");

  }

  static validatePostalCodeLocale(value: string): boolean {
    const postalCodeLocaleValues: PostalCodeLocale[] = [
      'CA', 'CZ', 'PL', 'US'
    ];
    return postalCodeLocaleValues.includes(value as PostalCodeLocale);
  }
}
