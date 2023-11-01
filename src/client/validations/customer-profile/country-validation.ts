import { countries as countriesList } from '../../../components/forms/registration-form/countries';
import CustomerDelailsFormError from '../validation-error/customer-details-form-error';
import PostCodeValidation from './post-code-validation';

export default class CountryValidator {
  static VALIDATION_ERRORS = {
    country: "Must be a valid country from a predefined list",
  }

  static validateCountry(form: HTMLElement, postalCode: string, country: string) {
    CustomerDelailsFormError.removeCountryInvalidBackground(form);
    const errors = [];
    if (!this.checkCountry(country)) {
      errors.push(this.VALIDATION_ERRORS.country);
    }
    if (errors.length !== 0) {
      CustomerDelailsFormError.countryErrors(form, errors);
      return false;
    }
    CustomerDelailsFormError.countryErrors(form, errors);
    PostCodeValidation.validatePostalCode(form, postalCode, country, true);
    return true;
  }

  static checkCountry(country: string) {
    const isPresentCountry =
      Object.values(countriesList)
        .map((elem) => elem)
        .indexOf(country) !== -1;
    return isPresentCountry;
  }
}
