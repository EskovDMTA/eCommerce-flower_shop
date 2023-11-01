import CustomerDelailsFormError from '../validation-error/customer-details-form-error';

export default class DateBirthValidation {
  static MIN_AGE = 13;

  static VALIDATION_ERRORS = {
    dateOfBirth: `Minimum age for registration is ${this.MIN_AGE} years old`,
  }

  static validateBirthdayDate(userBirthday: string) {
    CustomerDelailsFormError.removeDOBInvalidBackground();
    const errors = [];
    if(!this.checkClientAgeVerification(userBirthday)){
      errors.push(this.VALIDATION_ERRORS.dateOfBirth);
    }
    if (errors.length !== 0) {
      CustomerDelailsFormError.dobErrors(errors);
      return false;
    }
    CustomerDelailsFormError.dobErrors(errors);
    return true;
  }

  static checkClientAgeVerification(userBirthday: string) {
    const today = new Date();
    const birthdayDate = new Date(userBirthday);
    const age = today.getFullYear() - birthdayDate.getFullYear();
    return age >= this.MIN_AGE;
  }
}
