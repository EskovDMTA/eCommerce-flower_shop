/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './index.css';
import { Address, Customer } from '@commercetools/platform-sdk';
import Page from '../../templates/page';
import CreateElement from '../../templates/constructor';
import userPath from '../../assets/images/user_icon.svg';
import addressPath from '../../assets/images/address.svg';
import logPath from '../../assets/images/login.svg';
import deletePath from '../../assets/images/delete.svg';
import changePath from '../../assets/images/pencil.svg';
import TokenConstants from '../../constants/token-constants/token-constants';
import UserService from '../../business-services/user-service';
import CustomersRepository from '../../repositories/customers-repository';
import { countries } from '../../components/forms/registration-form/countries';
import ProfileFormListener from '../../components/forms/profile-forms/profile-form-listener';
import AddressFormListener from '../../components/forms/profile-forms/address-form-listener';
import PasswordFormListener from '../../components/forms/profile-forms/password-form-listener';

export default class ProfilePage extends Page {

  formListener: ProfileFormListener;

  addressesFormListener: AddressFormListener;

  passwordFormListener: PasswordFormListener;

  customersRepository: CustomersRepository;

  customerDetails: Customer;

  profileForm!: HTMLElement;

  personalChangeButton!: HTMLElement;

  deleteAddressBtn!: HTMLElement;

  static TextObject = {
    MainTitle: 'Profile',
  };


  constructor(id: string,  customersRepository: CustomersRepository) {
    super(id);
    this.customersRepository = customersRepository;
    this.formListener = new ProfileFormListener(this);
    this.passwordFormListener = new PasswordFormListener(this);
    this.addressesFormListener = new AddressFormListener(this);
    this.customerDetails = {} as Customer;
  }


  async init(): Promise<void> {
    const result = await this.customersRepository.getCustomerDetails();
    if (result) {
      this.customerDetails = result;
    }
    else {
      throw new Error('Empty customer');
    }
  }

  renderPage() {
    const profileSection = new CreateElement('section', ['profile-section']).appendTo(this.container);
    const profileNav = new CreateElement('div', ['profile-nav']).appendTo(profileSection);
    new CreateElement('h2', ['profile-subtitle'], [], `My account`).appendTo(profileNav);
    const profileDetails = new CreateElement('a', ['profile-link'], []).appendTo(profileNav);
    profileDetails.classList.add('active-link');
    new CreateElement('img', ['profile-icon'], [{ prop: 'src', value: userPath }]).appendTo(profileDetails);
    new CreateElement('p', ['profile-text'], [], 'Account Details').appendTo(profileDetails);
    const profileAddress = new CreateElement('a', ['profile-link'], []).appendTo(profileNav);
    new CreateElement('img', ['profile-icon'], [{ prop: 'src', value: addressPath }]).appendTo(profileAddress);
    new CreateElement('p', ['profile-text'], [], 'Address').appendTo(profileAddress);
    const profileLogOut = new CreateElement('a', ['logout-link'], [{ prop: 'href', value: '#login-page' }]).appendTo(profileNav);
    new CreateElement('img', ['logout-icon'], [{ prop: 'src', value: logPath }]).appendTo(profileLogOut);
    new CreateElement('p', ['profile-text'], [], 'Log out').appendTo(profileLogOut);

    profileLogOut.addEventListener('click', () => {
      localStorage.removeItem(TokenConstants.USER_TOKEN);
      UserService.update();
    })

    const profileContainer = new CreateElement('div', ['profile-container']).appendTo(profileSection);
    this.profileForm = new CreateElement('form', ['profile-form']).appendTo(profileContainer);
    const profileSubtitle = new CreateElement('h2', ['profile-subtitle'], [], `Personal information`).appendTo(this.profileForm);
    const profileChangeBtn = new CreateElement('img', ['change-icon'], [{ prop: 'src', value: changePath }]).appendTo(profileSubtitle);

    new CreateElement('label', ['profile-label'], [{ prop: 'for', value: 'first-name' }], `First name`).appendTo(this.profileForm);
    const firstNameErrorsContainer = new CreateElement('div', ['first-name-error_container']).appendTo(this.profileForm);
    new CreateElement('ul', ['first-name-error_list']).appendTo(firstNameErrorsContainer);
    new CreateElement('input', ['first-name_box'],
      [{ prop: 'id', value: 'first-name' },
      { prop: 'value', value: this.customerDetails.firstName || '' }])
      .appendTo(this.profileForm);
    new CreateElement('label', ['profile-label'], [{ prop: 'for', value: 'last-name' }], `Last name`).appendTo(this.profileForm);
    const lastNameErrorsContainer = new CreateElement('div', ['last-name-error_container']).appendTo(this.profileForm);
    new CreateElement('ul', ['last-name-error_list']).appendTo(lastNameErrorsContainer);
    new CreateElement('input', ['last-name_box'],
      [{ prop: 'id', value: 'last-name' },
      { prop: 'value', value: this.customerDetails.lastName || '' }])
      .appendTo(this.profileForm);
    new CreateElement('label', ['profile-label'], [{ prop: 'for', value: 'date' }], `Date of birth`).appendTo(this.profileForm);
    const dateOfBirthErrorsContainer = new CreateElement('div', ['dob-error_container']).appendTo(this.profileForm);
    new CreateElement('ul', ['dob-error_list']).appendTo(dateOfBirthErrorsContainer);
    new CreateElement('input', ['dob_box'],
      [{ prop: 'id', value: 'date' },
      { prop: 'value', value: this.customerDetails.dateOfBirth || '' }])
      .appendTo(this.profileForm);
    new CreateElement('label', ['profile-label'], [{ prop: 'for', value: 'email' }], `Email address`).appendTo(this.profileForm);
    const emailErrorsContainer = new CreateElement('div', ['email-error_container']).appendTo(this.profileForm);
    new CreateElement('ul', ['email-error_list']).appendTo(emailErrorsContainer);
    new CreateElement('input', ['email_box'],
      [{ prop: 'id', value: 'email' },
      { prop: 'value', value: this.customerDetails.email || '' }])
      .appendTo(this.profileForm);
    this.personalChangeButton = new CreateElement('button', ['profile-change_btn'], [], 'Save Changes').appendTo(this.profileForm);
    let personalInfoIsReadOnly = true;
    ProfilePage.toggleFormStatus(personalInfoIsReadOnly, this.profileForm, this.personalChangeButton);

    profileChangeBtn.addEventListener('click', () => {
      personalInfoIsReadOnly = !personalInfoIsReadOnly;
      ProfilePage.toggleFormStatus(personalInfoIsReadOnly, this.profileForm, this.personalChangeButton);
    })

    const passwordForm = new CreateElement('form', ['password-form']).appendTo(profileContainer);
    new CreateElement('h2', ['profile-subtitle'], [], `Password change`).appendTo(passwordForm);
    new CreateElement('label', ['profile-label'], [{ prop: 'for', value: 'old-password' }], `Current password`).appendTo(passwordForm);
    new CreateElement('input', ['current-password_box'], [{ prop: 'id', value: 'old-password' }, { prop: 'type', value: 'password' }]).appendTo(passwordForm);

    new CreateElement('label', ['profile-label'], [{ prop: 'for', value: 'new-password' }], `New password`).appendTo(passwordForm);
    const passwordErrorsContainer1 = new CreateElement('div', ['password-error_container']).appendTo(passwordForm);
    new CreateElement('ul', ['new-password-error_list']).appendTo(passwordErrorsContainer1);
    new CreateElement('input', ['new-password_box'], [{ prop: 'id', value: 'new-password' }, { prop: 'type', value: 'password' }]).appendTo(passwordForm);

    new CreateElement('label', ['profile-label'], [{ prop: 'for', value: 'confirm-password' }], `Confirmation password`).appendTo(passwordForm);
    const passwordErrorsContainer2 = new CreateElement('div', ['password-error_container']).appendTo(passwordForm);
    new CreateElement('ul', ['check-password-error_list']).appendTo(passwordErrorsContainer2);
    new CreateElement('input', ['check-password_box'], [{ prop: 'id', value: 'confirm-password' }, { prop: 'type', value: 'password' }]).appendTo(passwordForm);


    const passwordChangeButton = new CreateElement('button', ['password-change_btn'], [], 'Change Password').appendTo(passwordForm);

    const addressesContainer = new CreateElement('div', ['addresses-container']).appendTo(profileSection);
    const addressChangeContainer = new CreateElement('div', ['addresses-change-container']).appendTo(addressesContainer);
    this.customerDetails.addresses.forEach(address => {
      if (address.id) {
        const type = this.customerDetails.shippingAddressIds?.includes(address.id) ? 'Shipping' : 'Billing';
        const isDefault = this.customerDetails.defaultBillingAddressId?.includes(address.id) || this.customerDetails.defaultShippingAddressId?.includes(address.id);
        ProfilePage.renderAddress(addressChangeContainer, type, isDefault || false, address);
      }
    });

    const addressContainer = new CreateElement('div', ['new-address-container']).appendTo(addressesContainer);
    const addressAddBillingBtn = new CreateElement('button', ['address-add_btn'], [], 'Add new billing address').appendTo(addressContainer);
    const addressAddShippingBtn = new CreateElement('button', ['address-add_btn'], [], 'Add new shipping address').appendTo(addressContainer);

    addressAddBillingBtn.addEventListener('click', () => {
      const existingForm = document.querySelector('.new-form')
      if (existingForm) {
        existingForm.remove();
      }
      const createdForm = ProfilePage.renderAddress(addressContainer, 'Billing')
      this.addressesFormListener.addListenerToAddAddressForm(createdForm);
      createdForm.classList.add('new-form');
    });
    addressAddShippingBtn.addEventListener('click', () => {
      const existingForm = document.querySelector('.new-form')
      if (existingForm) {
        existingForm.remove();
      }
      const createdForm = ProfilePage.renderAddress(addressContainer, 'Shipping')
      this.addressesFormListener.addListenerToAddAddressForm(createdForm);
      createdForm.classList.add('new-form');
    });

    const addressNewForm = new CreateElement('form', ['new-address-form']).appendTo(profileSection);



    if (sessionStorage.getItem('profileMenu') === 'addresses') {
      ProfilePage.switchToAddressPage(profileAddress, profileDetails, addressesContainer, profileContainer, addressAddBillingBtn, addressAddShippingBtn);
    }

    profileDetails.addEventListener('click', () => {
      sessionStorage.setItem('profileMenu', 'profile');
      ProfilePage.switchToProfilePage(profileAddress, profileDetails, addressesContainer, profileContainer, addressAddBillingBtn, addressAddShippingBtn);
    })

    profileAddress.addEventListener('click', () => {
      sessionStorage.setItem('profileMenu', 'addresses');
      ProfilePage.switchToAddressPage(profileAddress, profileDetails, addressesContainer, profileContainer, addressAddBillingBtn, addressAddShippingBtn);
    })
  }

  private static renderAddress(profileSection: HTMLElement, type: 'Billing' | 'Shipping', isDefault?: boolean, address?: Address,): HTMLElement {

    const addressForm = new CreateElement('form', ['address-form']).appendTo(profileSection);
    addressForm.id = address?.id || '';
    addressForm.classList.add(type);
    const addressSubtitle = new CreateElement('h2', ['profile-subtitle'], [], `${type === 'Billing' ? 'Billing Address' : 'Shipping Address'}`).appendTo(addressForm);
    if (isDefault) {
      new CreateElement('p', ['default-address-message'], [], 'Default').appendTo(addressSubtitle)
    }

    let addressEditBtn;
    let deleteAddressBtn;
    if (address) {
      addressEditBtn = new CreateElement('img', ['change-icon'], [{ prop: 'src', value: changePath }]).appendTo(addressSubtitle);
      deleteAddressBtn = new CreateElement('img', ['delete-icon'], [{ prop: 'src', value: deletePath }]).appendTo(addressSubtitle);
    }

    new CreateElement('label', ['profile-label'], [{ prop: 'for', value: 'street' }], `Street`).appendTo(addressForm);
    const streetBoxErrorsContainer = new CreateElement('div', ['street-error_container']).appendTo(addressForm);
    new CreateElement('ul', ['street-error_list']).appendTo(streetBoxErrorsContainer);
    new CreateElement('input', ['street_box'], [{ prop: 'id', value: 'street' }, { prop: 'value', value: address?.streetName || '' }]).appendTo(addressForm);

    new CreateElement('label', ['profile-label'], [{ prop: 'for', value: 'city' }], `City`).appendTo(addressForm);
    const cityBoxErrorsContainer = new CreateElement('div', ['city-error_container']).appendTo(addressForm);
    new CreateElement('ul', ['city-error_list']).appendTo(cityBoxErrorsContainer);
    new CreateElement('input', ['city_box'], [{ prop: 'value', value: address?.city || '' }]).appendTo(addressForm);

    new CreateElement('label', ['profile-label'], [{ prop: 'for', value: 'country' }], `Country`).appendTo(addressForm);
    const countryBoxErrorsContainer = new CreateElement('div', ['country-error_container']).appendTo(addressForm);
    new CreateElement('ul', ['country-error_list']).appendTo(countryBoxErrorsContainer);
    const countryKey = Object.keys(countries).find((x) => countries[x] === address?.country);
    const countryBox = new CreateElement('select', ['country_box'], [{ prop: 'placeholder', value: 'Country' }]).appendTo(addressForm);
    const option0 = new CreateElement('option', ['option-choose'], [{ prop: 'value', value: 'option-choose' }], 'Choose your country').appendTo(countryBox);
    const option1 = new CreateElement('option', ['option-canada'], [{ prop: 'value', value: 'option-canada' }], 'Canada').appendTo(countryBox);
    const option2 = new CreateElement('option', ['option-czech'], [{ prop: 'value', value: 'option-czech' }], 'Czech Republic').appendTo(countryBox);
    const option3 = new CreateElement('option', ['option-poland'], [{ prop: 'value', value: 'option-poland' }], 'Poland').appendTo(countryBox);
    const option4 = new CreateElement('option', ['option-usa'], [{ prop: 'value', value: 'option-usa' }], 'United States of America').appendTo(countryBox);
    if (countryKey) {
      (countryBox as HTMLSelectElement).value = countryKey
    }

    new CreateElement('label', ['profile-label'], [{ prop: 'for', value: 'postcode' }], `Postal code`).appendTo(addressForm);
    const postalBoxErrorsContainer = new CreateElement('div', ['postal-code-error_container']).appendTo(addressForm);
    new CreateElement('ul', ['postal-code-error_list']).appendTo(postalBoxErrorsContainer);
    const postalBox = new CreateElement('input', ['postal_box'], [{ prop: 'value', value: address?.postalCode || '' }]).appendTo(addressForm);

    const checkBoxDefaultaddressForm = new CreateElement('div', ['check-box-addressForm']).appendTo(addressForm);
    const checkBoxDefault = new CreateElement('input', ['adress-default-checkbox'], [{ prop: 'type', value: 'checkbox' }, { prop: 'id', value: 'adress-default-checkbox-id' }]).appendTo(checkBoxDefaultaddressForm);
    if (isDefault != null) {
      (checkBoxDefault as HTMLInputElement).checked = isDefault;
    }
    new CreateElement('label', ['adress-checkbox-default-label'], [{ prop: 'for', value: 'adress-default-checkbox-id' }], 'Default address').appendTo(checkBoxDefaultaddressForm);
    const addressChangeBtn = new CreateElement('button', ['address-change_btn'], [], 'Save Changes').appendTo(addressForm);

    let addressIsReadOnly = true;
    if (address) {
      ProfilePage.toggleFormStatus(addressIsReadOnly, addressForm, addressChangeBtn);
    }
    addressEditBtn?.addEventListener('click', () => {
      addressIsReadOnly = !addressIsReadOnly;
      ProfilePage.toggleFormStatus(addressIsReadOnly, addressForm, addressChangeBtn);
    })

    return addressForm;
  }

  addListeners() {
    this.formListener.addListenersToTheForm();
    this.addressesFormListener.startListen();
    this.passwordFormListener.listenToSubmitFormBtn();
  }

  private static toggleFormStatus(readOnly: boolean, form: HTMLElement, personalChangeButton: HTMLElement) {
    const elems = (form as HTMLFormElement).elements;
    for (let i = 0; i < elems.length; i += 1) {
      if (readOnly) {
        elems[i].setAttribute('disabled', String(readOnly));
        personalChangeButton.setAttribute('disabled', 'true')
      }
      else {
        elems[i].removeAttribute('disabled')
        personalChangeButton.removeAttribute('disabled')
      }
    }
  }

  disablePersonalDetailsForm() {
    const elems = (this.profileForm as HTMLFormElement).elements;
    for (let i = 0; i < elems.length; i += 1) {
      elems[i].setAttribute('disabled', 'true');
      this.personalChangeButton.setAttribute('disabled', 'true')
    }
  }

  // eslint-disable-next-line class-methods-use-this
  disableAddressForm(id: string) {
    const addressEl = document.querySelector(`.address-form[id=${id}]`)
    const elems = (addressEl as HTMLFormElement).elements;
    const addressChangeBtn = addressEl?.querySelector('.address-change_btn');
    addressChangeBtn?.setAttribute('disabled', 'true')
    for (let i = 0; i < elems.length; i += 1) {
      elems[i].setAttribute('disabled', 'true');
    }
  }

  updateCustomer(customer: Customer) {
    this.customerDetails = customer;
    this.container.remove();
    this.container = document.createElement('div');
    this.container.id = 'current-page';
    document.body.append(this.container);
    this.renderPage();
    this.addListeners();
  }

  getCustomerVersion() {
    return this.customerDetails.version
  }

  render() {
    this.renderPage();
    return this.container;
  }


  private static switchToAddressPage(profileAddress: HTMLElement, profileDetails: HTMLElement, addressesContainer: HTMLElement, profileContainer: HTMLElement, deleteAddressBillingBtn: HTMLElement, addressAddShippingBtn: HTMLElement) {
    profileAddress.classList.add('active-link');
    profileDetails.classList.remove('active-link');
    addressesContainer.style.display = 'flex'
    profileContainer.style.display = 'none';
    deleteAddressBillingBtn.style.display = 'block';
    deleteAddressBillingBtn.style.display = 'block';
  }

  private static switchToProfilePage(profileAddress: HTMLElement, profileDetails: HTMLElement, addressesContainer: HTMLElement, profileContainer: HTMLElement, deleteAddressBillingBtn: HTMLElement, addressAddShippingBtn: HTMLElement) {
    profileDetails.classList.add('active-link');
    profileAddress.classList.remove('active-link');
    addressesContainer.style.display = 'none'
    profileContainer.style.display = 'flex';
    deleteAddressBillingBtn.style.display = 'none';
    deleteAddressBillingBtn.style.display = 'none';
  }
}