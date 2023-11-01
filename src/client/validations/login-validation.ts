import LoginFormError from './validation-error/login-form-errors';
import RegistrationFormError from './validation-error/registration-form-error';

export default class LoginValidation {
  static VALIDATION_ERRORS = {
    mailFormat: 'Wrong email format',
  };

  static validateLogin(email: string, form: "registration" | "login"): boolean {
    const formError = form === "registration" ? RegistrationFormError : LoginFormError;
    formError.removeLoginInvalidBackground();
    const errors = [];
    if (!(this.checkMailFormat(email) && this.checkSpace(email) && this.checkMailDomain(email) && this.checkAtSymbol(email))) {
      errors.push(this.VALIDATION_ERRORS.mailFormat);
    }
    if (errors.length !== 0) {
      formError.loginErrors(errors);
      return false;
    }
    formError.loginErrors(errors);
    return true;
  }

  static checkMailFormat(email: string) {
    const regularPattern = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]+$/;
    return regularPattern.test(email);
  }

  static checkSpace(email: string) {
    return email.trim() === email;
  }


  static checkMailDomain(email: string) {
    const regularPattern = /@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i;
    return regularPattern.test(email);
  }

  static checkAtSymbol(email: string) {
    const regularPattern = /@/;
    return regularPattern.test(email);
  }
}
