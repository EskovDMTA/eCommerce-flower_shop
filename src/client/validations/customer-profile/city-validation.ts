import CustomerDelailsFormError from '../validation-error/customer-details-form-error';

export default class CityValidation {
  static VALIDATION_ERRORS = {
    city: 'Must contain at least one character and no special characters or numbers',
  }

  static validateCity(container:HTMLElement, city: string) {
    CustomerDelailsFormError.removeCityInvalidBackground(container);
    const errors = [];
    if(!this.checkCityName(city)){
      errors.push(this.VALIDATION_ERRORS.city);
    }
    if (errors.length !== 0) {
      CustomerDelailsFormError.cityErrors(container, errors);
      return false;
    }
    CustomerDelailsFormError.cityErrors(container, errors);
    return true;
  }

  static checkCityName(city: string) {

    const regularPattern = /^[A-Za-z]+\s?[A-Za-z]*$/;
    return regularPattern.test(city);
  }
}
