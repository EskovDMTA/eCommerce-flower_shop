import RegistrationFormError from './validation-error/registration-form-error';
import DocumentDataFetcher from '../../helpers/document-data-fetcher';

export default class LastNameValidation {
  static VALIDATION_ERRORS = {
    lastName: 'Must contain at least one character and no special characters or numbers',
  }

  static validateLastName() {
    RegistrationFormError.removeLastNameInvalidBackground();
    const errors = [];
    if(!this.checkLastName()){
      errors.push(this.VALIDATION_ERRORS.lastName);
    }
    if (errors.length !== 0) {
      RegistrationFormError.lastNameErrors(errors);
      return false;
    }
    RegistrationFormError.lastNameErrors(errors);
    return true;
  }

  static checkLastName() {
    const lastName = DocumentDataFetcher.getLastNameFromRegisterForm();
    const regularPattern = /^[a-zA-Z\s]+$/;
    return regularPattern.test(lastName)
  }
}
