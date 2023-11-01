import RegistrationFormError from './validation-error/registration-form-error';
import DocumentDataFetcher from '../../helpers/document-data-fetcher';


export default class FirstNameValidation {
  static VALIDATION_ERRORS = {
    firstName: 'Must contain at least one character and no special characters or numbers',
  }

  static validateFirstName() {
    RegistrationFormError.removeFirstNameInvalidBackground();
    const errors = [];
    if(!this.checkFirstName()){
      errors.push(this.VALIDATION_ERRORS.firstName);
    }
    if (errors.length !== 0) {
      RegistrationFormError.firstNameErrors(errors);
      return false;
    }
    RegistrationFormError.firstNameErrors(errors);
    return true;
  }

  static checkFirstName() {
    const firstName = DocumentDataFetcher.getFirstNameFromRegisterForm();
    const regularPattern = /^[a-zA-Z\s]+$/;
    return regularPattern.test(firstName)
  }
}
