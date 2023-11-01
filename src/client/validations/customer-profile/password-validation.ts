import PasswordError from "../validation-error/password-error";

export default class PasswordValidator {
  static VALIDATION_ERRORS = {
    passwordLength: "Minimum password length 8 characters",
    uppercaseLetter : "Password must contain at least 1 capital letter",
    lowercaseLetter: "Password must contain at least 1 lowercase letter",
    numberInPassword: "Password must contain at least 1 number",
    specialSymbol: `Password must contain special characters !@#$%^&*()?{}|<>`,
    checkSpace: "Password contain spaces",
  }

  static validatePassword(password: string, passwordError: typeof PasswordError) {
    passwordError.removePasswordInvalidBackground();
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
      passwordError.passwordErrors(errors);
      return false;
    }
    passwordError.passwordErrors(errors);
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
