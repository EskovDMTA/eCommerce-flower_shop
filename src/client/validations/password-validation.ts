import LoginFormError from './validation-error/login-form-errors';
import ProfileFormError from './validation-error/customer-details-form-error';
import RegistrationFormError from './validation-error/registration-form-error';

export default class PasswordValidator {
  static VALIDATION_ERRORS = {
    passwordLength: "Minimum password length 8 characters",
    uppercaseLetter : "Password must contain at least 1 capital letter",
    lowercaseLetter: "Password must contain at least 1 lowercase letter",
    numberInPassword: "Password must contain at least 1 number",
    specialSymbol: `Password must contain special characters !@#$%^&*()?{}|<>`,
    checkSpace: "Password contain spaces",
  }

  static validatePassword(password: string, form: "registration" | "login" | "profile") {
    let formError: typeof RegistrationFormError | typeof LoginFormError | typeof ProfileFormError

    switch(form){
      case"registration": formError = RegistrationFormError; break;
      case"login": formError = LoginFormError; break;
      case"profile": formError = ProfileFormError; break;
      default: throw Error(`Form type ${form} is not supported`);
    }

    formError.removePasswordInvalidBackground();
    const errors = [];
    if(!this.checkLength(password)){
      errors.push(this.VALIDATION_ERRORS.passwordLength);
    }
    if(!this.checkUppercaseLetter(password)){
      errors.push(this.VALIDATION_ERRORS.uppercaseLetter);
    }
    if(!this.checkLowercaseLetter(password)){
      errors.push(this.VALIDATION_ERRORS.lowercaseLetter);
    }
    if(!this.checkNumber(password)){
      errors.push(this.VALIDATION_ERRORS.numberInPassword);
    }
    if(!this.checkSpecialSymbol(password)){
      errors.push(this.VALIDATION_ERRORS.specialSymbol);
    }
    if(!this.checkSpace(password)){
      errors.push(this.VALIDATION_ERRORS.checkSpace);
    }
    if (errors.length !== 0) {
      formError.passwordErrors(errors);
      return false;
    }
    formError.passwordErrors(errors);
    return true;
  }

  static checkSpace(password: string) {
    return password.trim() === password;
  }

  static checkLength(password: string): boolean {
    return password.length >= 8;
  }

  static checkUppercaseLetter(password: string): boolean {
    const regularPattern = /[A-Z]/;
    return regularPattern.test(password);
  }

  static checkLowercaseLetter(password: string) {
    const regularPattern = /[a-z]/;
    return regularPattern.test(password);
  }

  static checkNumber(password: string) {
    const regularPattern = /[0-9]/;
    return regularPattern.test(password);
  }

  static checkSpecialSymbol(password: string) {
    const regularPattern = /[!@#$%^&*()?{}|<>]/;
    return regularPattern.test(password);
  }
}
