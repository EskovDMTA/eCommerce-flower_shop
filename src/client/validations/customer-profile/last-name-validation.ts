import CustomerDelailsFormError from '../validation-error/customer-details-form-error';

export default class LastNameValidation {
  static VALIDATION_ERRORS = {
    lastName: 'Must contain at least one character and no special characters or numbers',
  }

  static validateLastName(lastName: string) {
    CustomerDelailsFormError.removeLastNameInvalidBackground();
    const errors = [];
    if(!this.checkLastName(lastName)){
      errors.push(this.VALIDATION_ERRORS.lastName);
    }
    if (errors.length !== 0) {
      CustomerDelailsFormError.lastNameErrors(errors);
      return false;
    }
    CustomerDelailsFormError.lastNameErrors(errors);
    return true;
  }

  static checkLastName(lastName: string) {
    const regularPattern = /^[a-zA-Z]+$/;
    return regularPattern.test(lastName)
  }
}
