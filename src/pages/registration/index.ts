/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable class-methods-use-this */
import './index.css';
import Page from '../../templates/page';
import СreateElement from '../../templates/constructor';
import welcomeImgSmallPath from '../../assets/images/flowers/welcome-img-small.png';
import welcomeImgBigPath from '../../assets/images/flowers/welcome-img-big.png';
import RegistrationFormListener from '../../components/forms/registration-form/form-listener';

class RegisterPage extends Page {
  static TextObject = {
    MainTitle: 'Registration Page',
  };

  constructor(id: string) {
    super(id);
  }

  renderPage() {
    const section = new СreateElement('section', ['register-section']).appendTo(
      this.container,
    );
    const container = new СreateElement('div', ['register-container']).appendTo(
      section,
    );
    const block = new СreateElement('form', ['register-block']).appendTo(
      container,
    );
    const titleBlock = new СreateElement('form', ['register-title-block']).appendTo(block);
    const title = new СreateElement(
      'a',
      ['register-login-title'],
      [{prop: 'href', value: '#login-page'}],
      'Login',
    ).appendTo(titleBlock);
    const titleLoginLine = new СreateElement('div', ['register-title-line'], [], 'I').appendTo(titleBlock);
    const titleRegister = new СreateElement('h1', ['register-register-title'], [], 'Register').appendTo(titleBlock);
    const text = new СreateElement(
      'div',
      ['register-text'],
      [],
      'Enter your details.',
    ).appendTo(block);
    const emailErrorsContainer = new СreateElement('div', ['register-email-error_container']).appendTo(block);
    const emailError = new СreateElement('ul', ['register-email-error_list']).appendTo(emailErrorsContainer);
    const emailBox = new СreateElement(
      'input',
      ['register-email_box'],
      [{ prop: 'placeholder', value: 'Enter your email address' }],
    ).appendTo(block);
    const passwordErrorsContainer = new СreateElement('div', ['register-password-error_container']).appendTo(block);
    const passwordErrorsList = new СreateElement('ul', ['register-password-error_list']).appendTo(passwordErrorsContainer);
    const passwordBox = new СreateElement(
      'input',
      ['register-password_box'],
      [
        { prop: 'placeholder', value: 'Password' },
        { prop: 'type', value: 'password' },
      ],
    ).appendTo(block);
    const firstNameErrorsContainer = new СreateElement('div', ['register-first-name-error_container']).appendTo(block);
    const firstNameError = new СreateElement('ul', ['register-first-name-error_list']).appendTo(firstNameErrorsContainer);
    const firstNameBox = new СreateElement(
      'input',
      ['register-first-name_box'],
      [{ prop: 'placeholder', value: 'First name' }],
    ).appendTo(block);
    const lastNameErrorsContainer = new СreateElement('div', ['register-last-name-error_container']).appendTo(block);
    const lastNameError = new СreateElement('ul', ['register-last-name-error_list']).appendTo(lastNameErrorsContainer);
    const lastNameBox = new СreateElement(
      'input',
      ['register-last-name_box'],
      [{ prop: 'placeholder', value: 'Last name' }],
    ).appendTo(block);
    const dateOfBirthErrorsContainer = new СreateElement('div', ['register-dob-error_container']).appendTo(block);
    const dateOfBirthError = new СreateElement('ul', ['register-dob-error_list']).appendTo(dateOfBirthErrorsContainer);
    const dateOfBirthBox = new СreateElement(
      'input',
      ['register-date-birth_box'],
      [
        { prop: 'placeholder', value: 'Date of birth' },
        { prop: 'type', value: 'date' },
      ],
    ).appendTo(block);
    const adressText = new СreateElement(
      'div',
      ['register-adress_text'],
      [],
      'Shipping address:',
    ).appendTo(block);
    const streetBoxErrorsContainer = new СreateElement('div', ['register-street-error_container']).appendTo(block);
    const streetBoxError = new СreateElement('ul', ['register-street-error_list']).appendTo(streetBoxErrorsContainer);
    const streetBox = new СreateElement(
      'input',
      ['register-street_box'],
      [{ prop: 'placeholder', value: 'Street' }],
    ).appendTo(block);
    const cityBoxErrorsContainer = new СreateElement('div', ['register-city-error_container']).appendTo(block);
    const cityBoxError = new СreateElement('ul', ['register-city-error_list']).appendTo(cityBoxErrorsContainer);
    const cityBox = new СreateElement(
      'input',
      ['register-city_box'],
      [{ prop: 'placeholder', value: 'City' }],
    ).appendTo(block);
    const countryBoxErrorsContainer = new СreateElement('div', ['register-country-error_container']).appendTo(block);
    const countryBoxError = new СreateElement('ul', ['register-country-error_list']).appendTo(countryBoxErrorsContainer);
    const countryBox = new СreateElement('select', ['register-country_box'], [{ prop: 'placeholder', value: 'Country' }]).appendTo(block);
    const option0 = new СreateElement('option', ['option-choose'], [{ prop: 'value', value: 'option-choose' }], 'Choose your country').appendTo(countryBox);
    const option1 = new СreateElement('option', ['option-canada'], [{ prop: 'value', value: 'option-canada' }], 'Canada').appendTo(countryBox);
    const option2 = new СreateElement('option', ['option-czech'], [{ prop: 'value', value: 'option-czech' }], 'Czech Republic').appendTo(countryBox);
    const option3 = new СreateElement('option', ['option-poland'], [{ prop: 'value', value: 'option-poland' }], 'Poland').appendTo(countryBox);
    const option4 = new СreateElement('option', ['option-usa'], [{ prop: 'value', value: 'option-usa' }], 'United States of America').appendTo(countryBox);
    const postalBoxErrorsContainer = new СreateElement('div', ['register-postal-code-error_container']).appendTo(block);
    const postalBoxError = new СreateElement('ul', ['register-postal-code-error_list']).appendTo(postalBoxErrorsContainer);
    const postalBox = new СreateElement(
      'input',
      ['register-postal_box'],
      [{ prop: 'placeholder', value: 'Postal code' }],
    ).appendTo(block);
    const checkBoxDefaultBlock = new СreateElement(
      'div',
      ['check-box-block']
    ).appendTo(block);
    const checkBoxDefault = new СreateElement('input', ['adress-default-checkbox'], [{ prop: 'type', value: 'checkbox' }, { prop: 'id', value: 'adress-default-checkbox-id' }]).appendTo(checkBoxDefaultBlock);
    const checkBoxDefaultLabel = new СreateElement('label', ['adress-checkbox-default-label'], [{ prop: 'for', value: 'adress-default-checkbox-id' }], 'Set as default address').appendTo(checkBoxDefaultBlock);
    const checkBoxBlock = new СreateElement(
      'div',
      ['check-box-block']
    ).appendTo(block);
    const checkBox = new СreateElement('input', ['adress-checkbox'], [{ prop: 'type', value: 'checkbox' }, { prop: 'id', value: 'adress-checkbox-id' }]).appendTo(checkBoxBlock) as HTMLInputElement;
    const checkBoxLabel = new СreateElement('label', ['adress-checkbox-label'], [{ prop: 'for', value: 'adress-checkbox-id' }], 'Use as a billing adress').appendTo(checkBoxBlock);
    const adressBillingBlock = new СreateElement('div', ['register-adress-billing-block']).appendTo(block);
    const adressTextBilling = new СreateElement('div', ['register-adress_text-billing'], [], 'Billing address:').appendTo(adressBillingBlock);
    const streetBoxBillingErrorsContainer = new СreateElement('div', ['register-billing-street-error_container']).appendTo(adressBillingBlock);
    const streetBoxBillingError = new СreateElement('ul', ['register-billing-street-error_list']).appendTo(streetBoxBillingErrorsContainer);
    const streetBoxBilling = new СreateElement('input', ['register-street_box-billing'], [{ prop: 'placeholder', value: 'Street' }]).appendTo(adressBillingBlock);
    const cityBoxBillingErrorsContainer = new СreateElement('div', ['register-billing-city-error_container']).appendTo(adressBillingBlock);
    const cityBoxBillingError = new СreateElement('ul', ['register-billing-city-error_list']).appendTo(cityBoxBillingErrorsContainer);
    const cityBoxBilling = new СreateElement(
      'input',
      ['register-city_box-billing'],
      [{ prop: 'placeholder', value: 'City' }],
    ).appendTo(adressBillingBlock);
    const postalBoxBillingErrorsContainer = new СreateElement('div', ['register-billing-postal-code-error_container']).appendTo(adressBillingBlock);
    const postalBoxBillingError = new СreateElement('ul', ['register-billing-postal-code-error_list']).appendTo(postalBoxBillingErrorsContainer);
    const postalBoxBilling = new СreateElement(
      'input',
      ['register-postal_box-billing'],
      [{ prop: 'placeholder', value: 'Postal code' }],
    ).appendTo(adressBillingBlock);
    const countryBoxBillingErrorsContainer = new СreateElement('div', ['register-billing-country-error_container']).appendTo(adressBillingBlock);
    const countryBoxBillingError = new СreateElement('ul', ['register-billing-country-error_list']).appendTo(countryBoxBillingErrorsContainer);
    const countryBoxBilling = new СreateElement(
      'select',
      ['register-country_box-billing'],
      [{ prop: 'placeholder', value: 'Country' }],
    ).appendTo(adressBillingBlock);
    const option00 = new СreateElement('option', ['option-choose'], [{ prop: 'value', value: 'option-choose' }], 'Choose your country').appendTo(countryBoxBilling);
    const option01 = new СreateElement('option', ['option-canada'], [{ prop: 'value', value: 'option-canada' }], 'Canada').appendTo(countryBoxBilling);
    const option02 = new СreateElement('option', ['option-czech'], [{ prop: 'value', value: 'option-czech' }], 'Czech Republic').appendTo(countryBoxBilling);
    const option03 = new СreateElement('option', ['option-poland'], [{ prop: 'value', value: 'option-poland' }], 'Poland').appendTo(countryBoxBilling);
    const option04 = new СreateElement('option', ['option-usa'], [{ prop: 'value', value: 'option-usa' }], 'United States of America').appendTo(countryBoxBilling);
    const checkBoxBillingDefaultBlock = new СreateElement(
      'div',
      ['check-box-block']
    ).appendTo(adressBillingBlock);
    const checkBoxBillingDefault = new СreateElement('input', ['address-default-checkbox'], [{ prop: 'type', value: 'checkbox' }, { prop: 'id', value: 'address-default-checkbox-id' }]).appendTo(checkBoxBillingDefaultBlock);
    const checkBoxBillingDefaultLabel = new СreateElement('label', ['address-default-label'], [{ prop: 'for', value: 'address-default-checkbox-id' }], 'Set as default address').appendTo(checkBoxBillingDefaultBlock);
    const button = new СreateElement(
      'button',
      ['register-register_btn'],
      [],
      'Register',
    ).appendTo(block);

    checkBox.addEventListener('change', function() {
      if (this.checked) {
        adressBillingBlock.style.display = 'none';
      } else {
        adressBillingBlock.style.display = 'block';
      }
    });
  }

  addListeners(){
    RegistrationFormListener.addListenersToForm();
  }

  render() {
    this.renderPage();
    return this.container;
  }
}

export default RegisterPage;
