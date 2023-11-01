import RegistrationFormError from './validation-error/registration-form-error';
import DocumentDataFetcher from '../../helpers/document-data-fetcher';
import { countries as countriesList } from '../../components/forms/registration-form/countries';
import PostCodeValidation from './post-code-validation';
import { AddressType } from './validation-error/interfaces';

export default class CountryValidator {
  static VALIDATION_ERRORS = {
    country: "Must be a valid country from a predefined list",
  }

  static validateCountry(address: AddressType = 'shipping') {
    RegistrationFormError.removeCountryInvalidBackground(address);
    const errors = [];
    if(!this.checkCountry(address)){
      errors.push(this.VALIDATION_ERRORS.country);
    }
    if (errors.length !== 0) {
      RegistrationFormError.countryErrors(errors, address);
      return false;
    }
    RegistrationFormError.countryErrors(errors, address);
    PostCodeValidation.validatePostalCode(true, address);
    return true;
  }

  static checkCountry(address: AddressType) {
    let country;
    if(address === "shipping") {
      country = DocumentDataFetcher.getCountryFromRegisterForm();
    }else {
      country = DocumentDataFetcher.getBillingCountryFromRegisterForm()
    }
    const isPresentCountry =
      Object.values(countriesList)
        .map((elem) => elem)
        .indexOf(country) !== -1;
    return isPresentCountry;
  }
}
