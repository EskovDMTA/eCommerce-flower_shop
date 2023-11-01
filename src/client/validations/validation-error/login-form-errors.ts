import ValidationError from './validation-errors';

export default class LoginFormError extends ValidationError {
  static LOGIN_ERRORS_LIST = '.login-error_list';

  static LOGIN_INPUT = '.login-login_box';

  static PASSWORD_INPUT = '.login-password_box';

  static PASSWORD_ERRORS_LIST = '.password-error_list';

  static loginErrors(errors: string[]) {
    this.renderErrors(this.LOGIN_ERRORS_LIST, errors);
  }

  static passwordErrors(errors: string[]) {
    this.renderErrors(this.PASSWORD_ERRORS_LIST, errors);
  }

  static invalidLogin() {
    const loginInput = document.querySelector(this.LOGIN_INPUT);
    if (loginInput) {
      this.shakeInvalidInput(this.LOGIN_INPUT);
      this.addInvalidBackground(this.LOGIN_INPUT);
    }
  }

  static renderErrorFromServer(error: string){
    this.shakeInvalidInput(this.LOGIN_INPUT);
    this.shakeInvalidInput(this.PASSWORD_INPUT);
    this.addInvalidBackground(this.LOGIN_INPUT);
    this.addInvalidBackground(this.PASSWORD_INPUT);
    this.renderErrors(this.LOGIN_ERRORS_LIST, error);
  }

  static invalidPassword(){
    const passwordInput = document.querySelector(this.PASSWORD_INPUT);
    if (passwordInput) {
      this.shakeInvalidInput(this.PASSWORD_INPUT);
      this.addInvalidBackground(this.PASSWORD_INPUT);
    }
  }

  static removeLoginInvalidBackground(){
    this.removeInvalidBackground(this.LOGIN_INPUT)
  }

  static removePasswordInvalidBackground(){
    this.removeInvalidBackground(this.PASSWORD_INPUT)
  }
}

