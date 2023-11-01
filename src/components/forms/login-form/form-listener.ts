import LoginValidation from '../../../client/validations/login-validation';
import PasswordValidator from '../../../client/validations/password-validation';
import CustomerData from '../../../client/customer';
import DocumentDataFetcher from '../../../helpers/document-data-fetcher';
import CustomersService from '../../../business-services/customers-service';
import LoginFormError from '../../../client/validations/validation-error/login-form-errors';

export default class LoginFormListener {

  static addListenersToForm() {
    this.addListenerToMailInput();
    this.addListenerToPasswordInput();
    this.addListenerToLoginButton();
  }

  static addListenerToMailInput() {
    const emailInput = document.querySelector(
      '.login-login_box'
    ) as HTMLFormElement;
    emailInput.addEventListener('input', this.handleEmailInput);
  }

  static handleEmailInput(event: Event) {
    const mail = (event.target as HTMLInputElement).value;
    LoginValidation.validateLogin(mail, "login");
  }

  static addListenerToPasswordInput() {
    const passwordInput = document.querySelector(
      '.login-password_box'
    ) as HTMLFormElement;
    passwordInput.addEventListener('input', this.handlePasswordInput);
  }

  static handlePasswordInput(event: Event) {
    const password = (event.target as HTMLInputElement).value;
    PasswordValidator.validatePassword(password, "login");
  }

  static addListenerToLoginButton() {
    const inputButton = document.querySelector(
      '.login-login_btn'
    ) as HTMLButtonElement;
    inputButton.addEventListener('click', this.handleListenerButton);
  }

  static async handleListenerButton() {
    const password = DocumentDataFetcher.getPasswordFromLoginForm();
    const email = DocumentDataFetcher.getMailFromLoginForm();
    const loginIsValid = LoginValidation.validateLogin(email, "login");
    const passwordIsValid = PasswordValidator.validatePassword(password, "login")
    if (loginIsValid && passwordIsValid) {
      const customer = new CustomerData(email, password);
      const customerService = new CustomersService();
      try {
        await customerService.signIn(customer);
        window.location.hash = "main-page";
      } catch (e) {
        if (e instanceof Error){
          LoginFormError.renderErrorFromServer(e.message);
        }

      }
    } else {
      if(!loginIsValid) {
        LoginFormError.invalidLogin()
      }
      if(!passwordIsValid){
        LoginFormError.invalidPassword()
      }
    }
  }
}
