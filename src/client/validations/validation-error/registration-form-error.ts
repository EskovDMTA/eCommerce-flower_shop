import ValidationError from './validation-errors';
import { AddressType } from './interfaces';

export default class RegistrationFormError  extends ValidationError {
  static EMAIL_INPUT = ".register-email_box";

  static PASSWORD_INPUT = '.register-password_box';

  static FIRST_NAME_INPUT = '.register-first-name_box';

  static LAST_NAME_INPUT = '.register-last-name_box';

  static DOB_INPUT = '.register-date-birth_box';

  static STREET_INPUT = ".register-street_box";

  static BILLING_STREET_INPUT = ".register-street_box-billing";

  static CITY_INPUT = ".register-city_box";

  static BILLING_CITY_INPUT = ".register-city_box-billing";

  static POST_CODE_INPUT = ".register-postal_box";

  static BILLING_POST_CODE_INPUT = ".register-postal_box-billing";

  static COUNTRY_INPUT = ".register-country_box";

  static BILLING_COUNTRY_INPUT = ".register-country_box-billing";

  static EMAIL_ERROR_SPAN = '.register-email-error_list';

  static PASSWORD_ERROR_LIST = '.register-password-error_list';

  static FIRST_NAME_ERROR_SPAN = '.register-first-name-error_list';

  static LAST_NAME_ERROR_SPAN = '.register-last-name-error_list';

  static DOB_ERROR_SPAN = '.register-dob-error_list';

  static STREET_ERROR_SPAN = '.register-street-error_list';

  static BILLING_STREET_ERROR_SPAN = '.register-billing-street-error_list';

  static CITY_ERROR_SPAN = '.register-city-error_list';

  static BILLING_CITY_ERROR_SPAN = '.register-billing-city-error_list';

  static POSTAL_CODE_ERROR_SPAN = '.register-postal-code-error_list';

  static BILLING_POSTAL_CODE_ERROR_SPAN = '.register-billing-postal-code-error_list';

  static COUNTRY_ERROR_SPAN = ".register-country-error_list";

  static BILLING_COUNTRY_ERROR_SPAN = ".register-billing-country-error_list";

  static loginErrors(errors: string[] | string) {
    this.renderErrors(this.EMAIL_ERROR_SPAN, errors);
  }

  static passwordErrors(errors: string[]) {
    this.renderErrors(this.PASSWORD_ERROR_LIST, errors);
  }

  static firstNameErrors(errors: string[]) {
    this.renderErrors(this.FIRST_NAME_ERROR_SPAN, errors);
  }

  static lastNameErrors(errors: string[]) {
    this.renderErrors(this.LAST_NAME_ERROR_SPAN, errors);
  }

  static dobErrors(errors: string[]) {
    this.renderErrors(this.DOB_ERROR_SPAN, errors);
  }

  static streetErrors(errors: string[], address: AddressType) {
    if(address === "shipping") {
    this.renderErrors(this.STREET_ERROR_SPAN, errors);
  } else {
      this.renderErrors(this.BILLING_STREET_ERROR_SPAN, errors);
    }
  }

  static cityErrors(errors: string[], address: AddressType) {
    if(address === "shipping") {
      this.renderErrors(this.CITY_ERROR_SPAN, errors);
    } else {
      this.renderErrors(this.BILLING_CITY_ERROR_SPAN, errors);
    }

  }

  static postalCodeErrors(errors: string[], address: AddressType) {
    if(address === "shipping") {
      this.renderErrors(this.POSTAL_CODE_ERROR_SPAN, errors);
    } else {
      this.renderErrors(this.BILLING_POSTAL_CODE_ERROR_SPAN, errors);
    }

  }

  static countryErrors(errors: string[], address: AddressType) {
    if(address === "shipping"){
      this.renderErrors(this.COUNTRY_ERROR_SPAN, errors);
    } else {
      this.renderErrors(this.BILLING_COUNTRY_ERROR_SPAN, errors);
    }

  }

  static invalidMail() {
    const loginInput = document.querySelector(this.EMAIL_INPUT);
    if (loginInput) {
      this.shakeInvalidInput(this.EMAIL_INPUT);
      this.addInvalidBackground(this.EMAIL_INPUT);
    }
  };

  static invalidPassword() {
    const loginInput = document.querySelector(this.PASSWORD_INPUT);
    if (loginInput) {
      this.shakeInvalidInput(this.PASSWORD_INPUT);
      this.addInvalidBackground(this.PASSWORD_INPUT);
    }
  };

  static invalidFirstName() {
    const loginInput = document.querySelector(this.FIRST_NAME_INPUT);
    if (loginInput) {
      this.shakeInvalidInput(this.FIRST_NAME_INPUT);
      this.addInvalidBackground(this.FIRST_NAME_INPUT);
    }
  };

  static invalidLastName() {
    const loginInput = document.querySelector(this.LAST_NAME_INPUT);
    if (loginInput) {
      this.shakeInvalidInput(this.LAST_NAME_INPUT);
      this.addInvalidBackground(this.LAST_NAME_INPUT);
    }
  };

  static invalidDob() {
    const loginInput = document.querySelector(this.DOB_INPUT);
    if (loginInput) {
      this.shakeInvalidInput(this.DOB_INPUT);
      this.addInvalidBackground(this.DOB_INPUT);
    }
  };

  static invalidStreet(address: AddressType = "shipping") {
    let streetInput;
    if(address === "shipping") {
      streetInput = document.querySelector(this.STREET_INPUT);
    } else {
      streetInput = document.querySelector(this.BILLING_STREET_INPUT);
    }
    if (streetInput) {
      if(address === "shipping") {
        this.shakeInvalidInput(this.STREET_INPUT);
        this.addInvalidBackground(this.STREET_INPUT);
      }else {
        this.shakeInvalidInput(this.BILLING_STREET_INPUT);
        this.addInvalidBackground(this.BILLING_STREET_INPUT);
      }
    }
  };

  static invalidCity(address: AddressType = "shipping") {
    let cityInput;
    if(address === "shipping") {
      cityInput = document.querySelector(this.CITY_INPUT);
    } else {
      cityInput = document.querySelector(this.BILLING_CITY_INPUT);
    }
    if (cityInput) {
      if(address === "shipping"){
        this.shakeInvalidInput(this.CITY_INPUT);
        this.addInvalidBackground(this.CITY_INPUT);
      } else {
        this.shakeInvalidInput(this.BILLING_CITY_INPUT);
        this.addInvalidBackground(this.BILLING_CITY_INPUT);
      }
    }
  };

  static invalidPostCode(address: AddressType = "shipping") {
    let postCodeInput;
    if(address === "shipping") {
      postCodeInput = document.querySelector(this.POST_CODE_INPUT);
    }else {
      postCodeInput = document.querySelector(this.BILLING_POST_CODE_INPUT);
    }
    if (postCodeInput) {
      if(address === "shipping"){
        this.shakeInvalidInput(this.POST_CODE_INPUT);
        this.addInvalidBackground(this.POST_CODE_INPUT);
      } else {
        this.shakeInvalidInput(this.BILLING_POST_CODE_INPUT);
        this.addInvalidBackground(this.BILLING_POST_CODE_INPUT);
      }
    }
  };

  static invalidCountry(address: AddressType = "shipping") {
    let countryInput;
    if(address === "shipping"){
      countryInput = document.querySelector(this.COUNTRY_INPUT);
    } else{
      countryInput = document.querySelector(this.BILLING_COUNTRY_INPUT);
    }
    if (countryInput) {
      if(address === "shipping") {
        this.shakeInvalidInput(this.COUNTRY_INPUT);
        this.addInvalidBackground(this.COUNTRY_INPUT);
      } else {
        this.shakeInvalidInput(this.BILLING_COUNTRY_INPUT);
        this.addInvalidBackground(this.BILLING_COUNTRY_INPUT);
      }
    }
  };

  // static renderErrorFromServer(error: string){
  //   this.shakeInvalidInput(this.LOGIN_INPUT);
  //   this.shakeInvalidInput(this.PASSWORD_INPUT);
  //   this.addInvalidBackground(this.LOGIN_INPUT);
  //   this.addInvalidBackground(this.PASSWORD_INPUT);
  //   this.renderErrors(this.LOGIN_ERRORS_LIST, error);
  // }
  static removeLoginInvalidBackground(){
    this.removeInvalidBackground(this.EMAIL_INPUT)
  }

  static removePasswordInvalidBackground(){
    this.removeInvalidBackground(this.PASSWORD_INPUT)
  }

  static removeFirstNameInvalidBackground(){
    this.removeInvalidBackground(this.FIRST_NAME_INPUT)
  }

  static removeLastNameInvalidBackground(){
    this.removeInvalidBackground(this.LAST_NAME_INPUT)
  }

  static removeDOBInvalidBackground(){
    this.removeInvalidBackground(this.DOB_INPUT)
  }

  static removeStreetInvalidBackground(address: AddressType){
    if (address === 'shipping') {
      this.removeInvalidBackground(this.STREET_INPUT)
    }else {
      this.removeInvalidBackground(this.BILLING_STREET_INPUT)
    }

  }

  static removeCityInvalidBackground(address: AddressType){
    if (address === "shipping"){
      this.removeInvalidBackground(this.CITY_INPUT)
    } else {
      this.removeInvalidBackground(this.BILLING_CITY_INPUT)
    }

  }

  static removePostCodeInvalidBackground(address: AddressType){
    if(address === "shipping"){
      this.removeInvalidBackground(this.POST_CODE_INPUT)
    } else {
      this.removeInvalidBackground(this.BILLING_POST_CODE_INPUT)
    }

  }

  static removeCountryInvalidBackground(address: AddressType){
    if(address === "shipping") {
      this.removeInvalidBackground(this.COUNTRY_INPUT)
    } else {
      this.removeInvalidBackground(this.BILLING_COUNTRY_INPUT)
    }

  }


}
