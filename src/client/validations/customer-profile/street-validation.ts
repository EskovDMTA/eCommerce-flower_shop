import CustomerDelailsFormError from '../validation-error/customer-details-form-error';

export default class StreetValidation {
  static VALIDATION_ERRORS = {
    street: 'Must be at least 1 character',
  }

  static validateStreet(form: HTMLElement, street: string) {
    CustomerDelailsFormError.removeStreetInvalidBackground(form);
    const errors = [];
    if(!this.checkStreetName(street)){
      errors.push(this.VALIDATION_ERRORS.street);
    }
    if (errors.length !== 0) {
      CustomerDelailsFormError.streetErrors(form, errors);
      return false;
    }
    CustomerDelailsFormError.streetErrors(form, errors);
    return true;
  }

  static checkStreetName(street: string) {
    const regularPattern = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>_-]+$/;
    return regularPattern.test(street);
  }
}
