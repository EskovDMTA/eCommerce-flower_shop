import { BaseAddress, CustomerDraft } from '@commercetools/platform-sdk';
import RegistrationValidation from '../../../client/validations/registration-validation';
import PasswordValidator from '../../../client/validations/password-validation';
import LoginValidation from '../../../client/validations/login-validation';
import CountryValidator from '../../../client/validations/country-validation';
import FirstNameValidation from '../../../client/validations/first-name-validation';
import LastNameValidation from '../../../client/validations/last-name-validation';
import DateBirthValidation from '../../../client/validations/date-birth-validation';
import CityValidation from '../../../client/validations/city-validation';
import StreetValidation from '../../../client/validations/street-validation';
import PostCodeValidation from '../../../client/validations/post-code-validation';
import DocumentDataFetcher from '../../../helpers/document-data-fetcher';
import CustomersService from '../../../business-services/customers-service';


export default class RegistrationFormListener {
  static addListenersToForm() {
    this.addListenerToEmailInput();
    this.addListenerToPasswordInput();
    this.addListenerToFirstNameInput();
    this.addListenerToLastNameInput();
    this.addListenerToDOBInput();
    this.addListenerToStreetInput();
    this.addListenerToCityInput();
    this.addListenerToCountryInput();
    this.addListenerToPostalCodeInput();
    this.addListenerToRegistrationButton();

    this.addListenerToBillingStreetInput();
    this.addListenerToBillingCityInput();
    this.addListenerToBillingCountryInput()
  }

  static addListenerToEmailInput() {
    const emailInput = document.querySelector(
      '.register-email_box',
    ) as HTMLFormElement;
    emailInput.addEventListener('input', this.handleEmailInput);
  }

  static handleEmailInput(event: Event) {
    const email = (event.target as HTMLInputElement).value;
    LoginValidation.validateLogin(email, 'registration');
  }

  static addListenerToPasswordInput() {
    const passwordInput = document.querySelector(
      '.register-password_box',
    ) as HTMLFormElement;
    passwordInput.addEventListener('input', this.handlePasswordInput);
  }

  static handlePasswordInput(event: Event) {
    const password = (event.target as HTMLInputElement).value;
    PasswordValidator.validatePassword(password, 'registration');
  }

  static addListenerToCountryInput() {
    const countryInput = document.querySelector(
      '.register-country_box',
    ) as HTMLInputElement;
    countryInput.addEventListener('change', this.handleCountryInput);
  }

  static handleCountryInput(event: Event) {
    const country = event.target as HTMLInputElement;
    if (country.value) {
      CountryValidator.validateCountry();
    }
  }

  static addListenerToBillingCountryInput() {
    const countryInput = document.querySelector(
      '.register-country_box-billing',
    ) as HTMLInputElement;
    countryInput.addEventListener('change', this.handleBillingCountryInput);
  }

  static handleBillingCountryInput(event: Event) {
    const country = event.target as HTMLInputElement;
    if (country.value) {
      CountryValidator.validateCountry("billing");
    }
  }

  static addListenerToFirstNameInput() {
    const firstNameInput = document.querySelector(
      '.register-first-name_box',
    ) as HTMLFormElement;
    firstNameInput.addEventListener('input', this.handleFirstNameInput);
  }

  static handleFirstNameInput() {
    FirstNameValidation.validateFirstName();
  }

  static addListenerToLastNameInput() {
    const lastNameInput = document.querySelector(
      '.register-last-name_box',
    ) as HTMLFormElement;
    lastNameInput.addEventListener('input', this.handleLastNameInput);
  }

  static handleLastNameInput() {
    LastNameValidation.validateLastName();
  }

  static addListenerToDOBInput() {
    const dobInput = document.querySelector(
      '.register-date-birth_box',
    ) as HTMLFormElement;
    dobInput.addEventListener('input', this.handleDOBInput);
  }

  static handleDOBInput() {
    DateBirthValidation.validateBirthdayDate();
  }

  static addListenerToCityInput() {
    const cityInput = document.querySelector(
      '.register-city_box',
    ) as HTMLFormElement;
    cityInput.addEventListener('input', this.handleCityInput);
  }

  static handleCityInput() {
    CityValidation.validateCity();
  }

  static addListenerToBillingCityInput() {
    const cityInput = document.querySelector(
      '.register-city_box-billing',
    ) as HTMLFormElement;
    cityInput.addEventListener('input', this.handleBillingCityInput);
  }

  static handleBillingCityInput() {
    CityValidation.validateCity("billing");
  }


  static addListenerToStreetInput() {
    const streetInput = document.querySelector(
      '.register-street_box',
    ) as HTMLFormElement;
    streetInput.addEventListener('input', this.handleStreetInput);
  }

  static handleStreetInput() {
    StreetValidation.validateStreet();
  }

  static addListenerToBillingStreetInput() {
    const streetInput = document.querySelector(
      '.register-street_box-billing',
    ) as HTMLFormElement;
    streetInput.addEventListener('input', this.handleBillingStreetInput);
  }

  static handleBillingStreetInput() {
    StreetValidation.validateStreet("billing");
  }

  static addListenerToPostalCodeInput() {
    const postalCodeInput = document.querySelector(
      '.register-postal_box',
    ) as HTMLFormElement;
    postalCodeInput.addEventListener('input', this.handlePostalCodeInput);
  }

  static handlePostalCodeInput() {
    PostCodeValidation.validatePostalCode();
  }

  static addListenerToRegistrationButton() {
    const registrationButton = document.querySelector(
      '.register-register_btn',
    ) as HTMLButtonElement;
    registrationButton.addEventListener('click', this.handleListenerButton);
  }


  static async handleListenerButton(event: Event) {
    event.preventDefault();
    const password = DocumentDataFetcher.getPasswordFromRegistrationForm();
    const email = DocumentDataFetcher.getMailFromRegistrationForm();
    if (RegistrationValidation.validateRegistrationForm(email, password)) {
      const customerService = new CustomersService();
      const baseAddresses = new Array<BaseAddress>();
      baseAddresses.push(
        {id: "shipping",
        streetName: DocumentDataFetcher.getStreetFromRegisterForm(),
        country: DocumentDataFetcher.getCountryFromRegisterForm(),
        postalCode: DocumentDataFetcher.getPostalCodeFromRegisterForm(),
        city: DocumentDataFetcher.getCityFromRegisterForm() } as BaseAddress
      )
      if (DocumentDataFetcher.getCommonAddressFromRegisterForm()) {
        baseAddresses.push(
          {id: "billing",
          streetName: DocumentDataFetcher.getStreetFromRegisterForm(),
          country: DocumentDataFetcher.getCountryFromRegisterForm(),
          postalCode: DocumentDataFetcher.getPostalCodeFromRegisterForm(),
          city: DocumentDataFetcher.getCityFromRegisterForm() } as BaseAddress
        )
      } else {
        baseAddresses.push(
        {id: "billing",
        streetName: DocumentDataFetcher.getBillingStreetFromRegisterForm(),
        country: DocumentDataFetcher.getBillingCountryFromRegisterForm(),
        postalCode: DocumentDataFetcher.getBillingPostalCodeFromRegisterForm(),
        city: DocumentDataFetcher.getBillingCityFromRegisterForm() } as BaseAddress
      )
      }
      const customer = {
        email: DocumentDataFetcher.getMailFromRegistrationForm(),
        password: DocumentDataFetcher.getPasswordFromRegistrationForm(),
        firstName: DocumentDataFetcher.getFirstNameFromRegisterForm(),
        lastName: DocumentDataFetcher.getLastNameFromRegisterForm(),
        dateOfBirth: DocumentDataFetcher.getBirthdayDateFromRegisterForm(),
        shippingAddresses: [0],
        defaultShippingAddress: DocumentDataFetcher.getDefaultAddressFromRegisterForm() ? 0 : null,
        billingAddresses: [1],
        defaultBillingAddress: DocumentDataFetcher.getDefaultBillingAddressFromRegisterForm() ? 1 : null,
        addresses: baseAddresses
      } as CustomerDraft
      try {
        await customerService.signUp(customer);
        window.location.hash = 'main-page';
      } catch (e) {
        if (e instanceof Error) {
          console.log(e);
        }
      }
    } else {
      console.log("form invalid");
    }
  }
}
