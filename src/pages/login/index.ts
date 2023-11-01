/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable class-methods-use-this */
import "./index.css";
import Page from '../../templates/page';
import CreateElement from '../../templates/constructor';
import LoginFormListener from "../../components/forms/login-form/form-listener";


class LoginPage extends Page {
  static TextObject = {
    MainTitle: 'Login Page',
  };

  constructor(id: string) {
    super(id);
  }

  renderPage() {
    const section = new CreateElement('section', ['login-section']).appendTo(this.container);
    const container = new CreateElement('div', ['login-container']).appendTo(section);
    const block = new CreateElement('form', ['login-block']).appendTo(container);
    const titleBlock = new CreateElement('form', ['login-title-block']).appendTo(block);
    const titleLogin = new CreateElement('h1', ['login-title'], [], 'Login').appendTo(titleBlock);
    const titleLoginLine = new CreateElement('div', ['login-title-line'], [], 'I').appendTo(titleBlock);
    const titleRegister = new CreateElement('a', ['login-register-title'], [{prop: 'href', value: '#register-page'}], 'Register').appendTo(titleBlock);
    const text = new CreateElement('div', ['login-text'], [], 'Enter your username and password to login.').appendTo(block);
    const loginErrorsContainer = new CreateElement('div', ['login-error_container']).appendTo(block);
    const loginErrorsList = new CreateElement('ul', ['login-error_list']).appendTo(loginErrorsContainer);
    const loginBox = new CreateElement('input', ['login-login_box'], [{prop: 'placeholder', value: 'Enter your email address'}]).appendTo(block);
    const passwordErrorsContainer = new CreateElement('div', ['password-error_container']).appendTo(block)
    const passwordErrorsList = new CreateElement('ul', ['password-error_list']).appendTo(passwordErrorsContainer);
    const passwordBox = new CreateElement('input', ['login-password_box'], [{prop: 'placeholder', value: 'Password'}, {prop: 'type', value: 'password'}]).appendTo(block);
    const button = new CreateElement('button', ['login-login_btn'], [], 'Login').appendTo(block);
  }

  addListeners() {
    const btn = document.querySelector('.login-login_btn');
    btn?.addEventListener("click", (event) => event.preventDefault());
    LoginFormListener.addListenersToForm();
  }

  render() {
    this.renderPage();
    return this.container;
  }
}

export default LoginPage;
