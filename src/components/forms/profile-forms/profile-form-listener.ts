import { MyCustomerUpdateAction, MyCustomerSetFirstNameAction, MyCustomerSetLastNameAction, MyCustomerSetDateOfBirthAction, MyCustomerChangeEmailAction, MyCustomerUpdate } from "@commercetools/platform-sdk";
import CustomersRepository from "../../../repositories/customers-repository";
import type ProfilePage from "../../../pages/profile";
import Toast from "../../toast";
import FirstNameValidation from "../../../client/validations/customer-profile/first-name-validation";
import LastNameValidation from "../../../client/validations/customer-profile/last-name-validation";
import DateBirthValidation from "../../../client/validations/customer-profile/date-birth-validation";
import LoginValidation from "../../../client/validations/customer-profile/login-validation";
import PasswordValidator from "../../../client/validations/customer-profile/password-validation";
import NewPasswordError from "../../../client/validations/validation-error/new-password-error";
import CheckPasswordError from "../../../client/validations/validation-error/check-password-error";
import CurrentPasswordError from "../../../client/validations/validation-error/current-password-errror";

export default class ProfileFormListener {
    updates: MyCustomerUpdateAction[]

    customerRepository: CustomersRepository;

    page: ProfilePage;


    constructor(page: ProfilePage) {
        this.updates = new Array<MyCustomerUpdateAction>();
        this.customerRepository = new CustomersRepository();
        this.page = page;

    }

    addListenersToTheForm() {
        this.listenToFirstName();
        this.listenToLastName();
        this.listenToDateOfBirth();
        this.listenToEmail();
        this.listenToSubmitFormBtn();
        ProfileFormListener.listenNewToPassword();
        ProfileFormListener.listenCurrentPassword();
        ProfileFormListener.listenToCheckPassword();
    }


    static listenNewToPassword() {
        const input = document.querySelector('.new-password_box') as HTMLInputElement;
        input.addEventListener('input', (event) => {
           PasswordValidator.validatePassword((event.target as HTMLInputElement).value, NewPasswordError);
        });
    }

    static listenCurrentPassword() {
        const input = document.querySelector('.current-password_box') as HTMLInputElement;
        input.addEventListener('input', (event) => {
            PasswordValidator.validatePassword((event.target as HTMLInputElement).value, CurrentPasswordError);
        });
    }

    static listenToCheckPassword() {
        const input = document.querySelector('.check-password_box') as HTMLInputElement;
        input.addEventListener('input', (event) => {
            PasswordValidator.validatePassword((event.target as HTMLInputElement).value, CheckPasswordError);
        });
    }

    listenToFirstName() {
        const input = document.querySelector('.first-name_box') as HTMLInputElement;
        input.addEventListener('input', (event) => {
            FirstNameValidation.validateFirstName((event.target as HTMLInputElement).value)
        })
        input.addEventListener('change', (event) => {

            this.updates.push({ action: 'setFirstName', firstName: (event.target as HTMLInputElement).value } as MyCustomerSetFirstNameAction)
        })
    }

    listenToLastName() {
        const input = document.querySelector('.last-name_box') as HTMLInputElement;
        input.addEventListener('input', (event) => {
            LastNameValidation.validateLastName((event.target as HTMLInputElement).value)
        })
        input.addEventListener('change', (event) => {
            this.updates.push({ action: 'setLastName', lastName: (event.target as HTMLInputElement).value } as MyCustomerSetLastNameAction)
        })
    }

    listenToDateOfBirth() {
        const input = document.querySelector('.dob_box') as HTMLInputElement;
        input.addEventListener('input', (event) => {
            DateBirthValidation.validateBirthdayDate((event.target as HTMLInputElement).value)
        })
        input.addEventListener('change', (event) => {
            this.updates.push({ action: 'setDateOfBirth', dateOfBirth: (event.target as HTMLInputElement).value } as MyCustomerSetDateOfBirthAction)
        })
    }

    listenToEmail() {
        const input = document.querySelector('.email_box') as HTMLInputElement;
        input.addEventListener('input', (event) => {
            LoginValidation.validateLogin((event.target as HTMLInputElement).value)
        })
        input.addEventListener('change', (event) => {
            this.updates.push({ action: 'changeEmail', email: (event.target as HTMLInputElement).value } as MyCustomerChangeEmailAction)
        })
    }

    listenToSubmitFormBtn() {
        const btn = document.querySelector('.profile-change_btn') as HTMLInputElement;
        btn.addEventListener('click', async (event) => {
            event.preventDefault();
            let result;
            try {
                result = await this.customerRepository.updateCustomerDetails({ version: this.page.getCustomerVersion(), actions: this.updates } as MyCustomerUpdate)
            } catch (e) {
                Toast.showToast(`Unable to update customer.`, 5000, 'Error');
            }

            if (result) {
                this.page.updateCustomer(result);
                this.updates = [];
                this.page.disablePersonalDetailsForm();
                Toast.showToast('Customer has been updated successfully!', 5000, 'Info');
            }
        })
    }

}