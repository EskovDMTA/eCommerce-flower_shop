import LoginValidation from './login-validation';
import PasswordValidator from './password-validation';
import CountryValidator from './country-validation';
import FirstNameValidation from './first-name-validation';
import LastNameValidation from './last-name-validation';
import DateBirthValidation from './date-birth-validation';
import CityValidation from './city-validation';
import StreetValidation from './street-validation';
import PostCodeValidation from './post-code-validation';
import RegistrationFormError from './validation-error/registration-form-error';

export default class RegistrationFormValidation {

  static validateRegistrationForm(email: string, password: string) {
    let isValid;
    const billingBlock = document.querySelector(".register-adress-billing-block") as HTMLDivElement;
    if (billingBlock.style.display !== "none") {
      isValid = (
        LoginValidation.validateLogin(email, 'registration') &&
        PasswordValidator.validatePassword(password, 'registration') &&
        CountryValidator.validateCountry() &&
        FirstNameValidation.validateFirstName() &&
        LastNameValidation.validateLastName() &&
        DateBirthValidation.validateBirthdayDate() &&
        CityValidation.validateCity() &&
        StreetValidation.validateStreet() &&
        PostCodeValidation.validatePostalCode() &&
        CountryValidator.validateCountry() &&
        CityValidation.validateCity("billing") &&
        StreetValidation.validateStreet("billing") &&
        CountryValidator.validateCountry("billing") &&
        PostCodeValidation.validatePostalCode(true, "billing")
      );
    } else {
      isValid = (
        LoginValidation.validateLogin(email, 'registration') &&
        PasswordValidator.validatePassword(password, 'registration') &&
        CountryValidator.validateCountry() &&
        FirstNameValidation.validateFirstName() &&
        LastNameValidation.validateLastName() &&
        DateBirthValidation.validateBirthdayDate() &&
        CityValidation.validateCity() &&
        StreetValidation.validateStreet() &&
        PostCodeValidation.validatePostalCode() &&
        CountryValidator.validateCountry()
      )
    }
    this.addInvalidToInputsRegistrationForm(email, password)
    return isValid;
  }

  static addInvalidToInputsRegistrationForm(email: string, password: string) {
    const billingBlock = document.querySelector(".register-adress-billing-block") as HTMLDivElement;
    if (!LoginValidation.validateLogin(email, 'registration')) RegistrationFormError.invalidMail();
    if (!PasswordValidator.validatePassword(password, 'registration')) RegistrationFormError.invalidPassword();
    if (!CountryValidator.validateCountry()) RegistrationFormError.invalidCountry();
    if (!FirstNameValidation.validateFirstName()) RegistrationFormError.invalidFirstName();
    if (!LastNameValidation.validateLastName()) RegistrationFormError.invalidLastName();
    if (!DateBirthValidation.validateBirthdayDate()) RegistrationFormError.invalidDob();
    if (!CityValidation.validateCity()) RegistrationFormError.invalidCity();
    if (!StreetValidation.validateStreet()) RegistrationFormError.invalidStreet();
    if (!CountryValidator.validateCountry()) RegistrationFormError.invalidCountry();
    if (!PostCodeValidation.validatePostalCode()) RegistrationFormError.invalidPostCode();
    document.querySelector(".register-adress-billing-block")
    if (billingBlock.style.display !== "none") {
      if (!CityValidation.validateCity("billing")) RegistrationFormError.invalidCity("billing");
      if (!StreetValidation.validateStreet("billing")) RegistrationFormError.invalidStreet("billing");
      if (!CountryValidator.validateCountry("billing")) RegistrationFormError.invalidCountry("billing");
      if (!PostCodeValidation.validatePostalCode(true, "billing")) RegistrationFormError.invalidPostCode("billing");
    }
  }
}
