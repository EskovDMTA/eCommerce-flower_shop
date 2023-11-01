import ValidationError from "./validation-errors";

export default class CustomerDelailsFormError extends ValidationError {
  static FIRST_NAME_INPUT = '.first-name_box';

  static FIRST_NAME_ERROR_SPAN = '.first-name-error_list';

  static PASSWORD_ERRORS_LIST = '.password-error_container'

  static LAST_NAME_INPUT = '.last-name_box'

  static LAST_NAME_ERROR_SPAN = '.last-name-error_list'

  static DOB_ERROR_SPAN = '.dob-error_list'

  static DOB_INPUT = '.dob_box'

  static LOGIN_ERRORS_LIST = '.email-error_list';

  static LOGIN_INPUT = '.email_box';

  static STREET_INPUT = ".street_box";

  static STREET_ERROR_SPAN = '.street-error_list';

  static CITY_INPUT = ".city_box";

  static CITY_ERROR_SPAN = '.city-error_list';

  static COUNTRY_ERROR_SPAN = '.country-error_list'

  static COUNTRY_INPUT = '.country_box'

  static POSTAL_CODE_ERROR_SPAN = '.postal-code-error_list'

  static POST_CODE_INPUT = '.postal_box'

  static passwordErrors(errors: string[]) {
    this.renderErrors(this.PASSWORD_ERRORS_LIST, errors);
  }

  static removePasswordInvalidBackground() {
    this.removeInvalidBackground(this.FIRST_NAME_INPUT)
  }

  static firstNameErrors(errors: string[]) {
    this.renderErrors(this.FIRST_NAME_ERROR_SPAN, errors);
  }

  static removeFirstNameInvalidBackground() {
    this.removeInvalidBackground(this.FIRST_NAME_INPUT)
  }

  static removeLastNameInvalidBackground() {
    this.removeInvalidBackground(this.LAST_NAME_INPUT)
  }


  static lastNameErrors(errors: string[]) {
    this.renderErrors(this.LAST_NAME_ERROR_SPAN, errors);
  }

  static removeDOBInvalidBackground() {
    this.removeInvalidBackground(this.DOB_INPUT)
  }

  static dobErrors(errors: string[]) {
    this.renderErrors(this.DOB_ERROR_SPAN, errors);
  }


  static loginErrors(errors: string[]) {
    this.renderErrors(this.LOGIN_ERRORS_LIST, errors);
  }


  static removeLoginInvalidBackground() {
    this.removeInvalidBackground(this.LOGIN_INPUT)
  }


  static streetErrors(form: HTMLElement, errors: string[]) {
    this.renderErrorsForContainer(form, this.STREET_ERROR_SPAN, errors);

  }

  static removeStreetInvalidBackground(form: HTMLElement) {
    this.removeInvalidBackgroundForContainer(form, this.STREET_INPUT)
  }

  static removeCityInvalidBackground(form: HTMLElement) {
    this.removeInvalidBackgroundForContainer(form, this.CITY_INPUT)
  }

  static cityErrors(form: HTMLElement, errors: string[]) {
    this.renderErrorsForContainer(form, this.CITY_ERROR_SPAN, errors);
  }

  static countryErrors(form: HTMLElement, errors: string[]) {
    this.renderErrorsForContainer(form, this.COUNTRY_ERROR_SPAN, errors);
  }

  static removeCountryInvalidBackground(form: HTMLElement) {
    this.removeInvalidBackgroundForContainer(form, this.COUNTRY_INPUT)
  }

  static removePostCodeInvalidBackground(form: HTMLElement){

      this.removeInvalidBackgroundForContainer(form, this.POST_CODE_INPUT)
    

  }

  static postalCodeErrors(form: HTMLElement, errors: string[]) {
      this.renderErrorsForContainer(form, this.POSTAL_CODE_ERROR_SPAN, errors);

  }
} 