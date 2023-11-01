import { countries } from '../components/forms/registration-form/countries';

export default class DocumentDataFetcher {
  static getDataFromInput(modificator: string): string {
    const data = document.querySelector(modificator) as HTMLInputElement;
    if (data !== null) {
      return data.value;
    }
    return "";
  }

  static getDataFromCheckboxInput(modificator: string): boolean {
    const data = document.querySelector(modificator) as HTMLInputElement;
    if (data !== null) {
      return data.checked;
    }
    return false;
  }

  static getPasswordFromLoginForm(): string {
    return this.getDataFromInput(".login-password_box");
  }

  static getMailFromLoginForm(): string {
    return this.getDataFromInput(".login-login_box");
  }

  static getMailFromRegistrationForm(): string {
    return this.getDataFromInput(".register-email_box");
  }

  static getPasswordFromRegistrationForm(): string {
    return this.getDataFromInput(".register-password_box");
  }

  static getFirstNameFromRegisterForm(): string {
    return this.getDataFromInput(".register-first-name_box");
  };

  static getLastNameFromRegisterForm(): string {
    return this.getDataFromInput(".register-last-name_box");
  }


  static getBirthdayDateFromRegisterForm(): string {
    return this.getDataFromInput(".register-date-birth_box");
  }

  static getStreetFromRegisterForm(): string {
    return this.getDataFromInput(".register-street_box");
  }

  static getCityFromRegisterForm(): string {
    return this.getDataFromInput(".register-city_box");
  }

  static getPostalCodeFromRegisterForm(): string {
    return this.getDataFromInput(".register-postal_box");
  }

  static getCountryFromRegisterForm(): string {
    const countryValue = this.getDataFromInput(".register-country_box");
    return countries[countryValue];
  }

  static getDefaultAddressFromRegisterForm(): boolean {
    return this.getDataFromCheckboxInput(".adress-default-checkbox");
  }

  static getCommonAddressFromRegisterForm(): boolean {
    return this.getDataFromCheckboxInput(".adress-checkbox");
  }

  static getBillingStreetFromRegisterForm(): string {
    return this.getDataFromInput(".register-street_box-billing");
  }

  static getBillingCityFromRegisterForm(): string {
    return this.getDataFromInput(".register-city_box-billing");
  }

  static getBillingPostalCodeFromRegisterForm(): string {
    return this.getDataFromInput(".register-postal_box-billing");
  }

  static getBillingCountryFromRegisterForm(): string {
    const countryValue = this.getDataFromInput(".register-country_box-billing");
    return countries[countryValue];
  }

  static getDefaultBillingAddressFromRegisterForm(): boolean {
    return this.getDataFromCheckboxInput(".address-billing-default-checkbox");
  }

  static getMailFromProfileForm(): string {
    return this.getDataFromInput(".email_box");
  }

  static getPasswordFromProfileForm(): string {
    return this.getDataFromInput(".password_box");
  }

  static getFirstNameFromProfileForm(): string {
    return this.getDataFromInput(".first-name_box");
  };

  static getLastNameFromProfilerForm(): string {
    return this.getDataFromInput(".last-name_box");
  }


  static getBirthdayDateFromProfileForm(): string {
    return this.getDataFromInput(".date-birth_box");
  }

  static getProductIdFromProductPage() {
    const buyNowButton = document.querySelector(".buy-now") as HTMLButtonElement
    const productID = buyNowButton?.dataset.id
    return productID
  }


}
