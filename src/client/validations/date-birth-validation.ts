import RegistrationFormError from './validation-error/registration-form-error';
import DocumentDataFetcher from '../../helpers/document-data-fetcher';

export default class DateBirthValidation {
  static MIN_AGE = 13;

  static VALIDATION_ERRORS = {
    dateOfBirth: `Minimum age for registration is ${this.MIN_AGE} years old`,
  }

  static validateBirthdayDate() {
    RegistrationFormError.removeDOBInvalidBackground();
    const errors = [];
    if(!this.checkClientAgeVerification()){
      errors.push(this.VALIDATION_ERRORS.dateOfBirth);
    }
    if (errors.length !== 0) {
      RegistrationFormError.dobErrors(errors);
      return false;
    }
    RegistrationFormError.dobErrors(errors);
    return true;
  }

  static checkClientAgeVerification() {
    const userBirthday = DocumentDataFetcher.getBirthdayDateFromRegisterForm();
    const today = new Date();
    const birthdayDate = new Date(userBirthday);
    const age = today.getFullYear() - birthdayDate.getFullYear();
    return age >= this.MIN_AGE;
  }
}
