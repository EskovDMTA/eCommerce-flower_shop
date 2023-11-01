import validator from 'validator';
import PostalCodeLocale = validator.PostalCodeLocale;
import CustomerDelailsFormError from '../validation-error/customer-details-form-error';

export default class PostCodeValidation {
  static VALIDATION_ERRORS = {
    postalCode: 'The postal code is not valid in the country you selected',
  }

  static validatePostalCode(form:HTMLElement, postalCode: string, countryName: string, country= false) {
    if(!country){
      CustomerDelailsFormError.removePostCodeInvalidBackground(form);
    }
    const errors = [];
    if(!this.checkPostalCode(postalCode, countryName)){
      errors.push(this.VALIDATION_ERRORS.postalCode);
    }
    if (errors.length !== 0) {
      CustomerDelailsFormError.postalCodeErrors(form, errors);
      return false;
    }
    CustomerDelailsFormError.postalCodeErrors(form, errors);
    return true;
  }

  static checkPostalCode(postalCode: string, countryName: string) {

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
