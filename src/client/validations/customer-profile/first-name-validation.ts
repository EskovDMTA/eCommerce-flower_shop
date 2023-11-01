import CustomerDelailsFormError from '../validation-error/customer-details-form-error';


export default class FirstNameValidation {
  static VALIDATION_ERRORS = {
    firstName: 'Must contain at least one character and no special characters or numbers',
  }

  static validateFirstName(firstName: string) {
    CustomerDelailsFormError.removeFirstNameInvalidBackground();
    const errors = [];
    if(!this.checkFirstName(firstName)){
      errors.push(this.VALIDATION_ERRORS.firstName);
    }
    if (errors.length !== 0) {
      CustomerDelailsFormError.firstNameErrors(errors);
      return false;
    }
    CustomerDelailsFormError.firstNameErrors(errors);
    return true;
  }

  static checkFirstName(firstName: string) {
    const regularPattern = /^[a-zA-Z]+$/;
    return regularPattern.test(firstName)
  }
}
