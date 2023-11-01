import { CustomerSignin, MyCustomerChangePassword } from "@commercetools/platform-sdk";
import CustomersRepository from "../../../repositories/customers-repository";
import Toast from "../../toast";
import type ProfilePage from "../../../pages/profile";

export default class PasswordFormListener {
    updates: MyCustomerChangePassword[]

    customerRepository: CustomersRepository;

    page: ProfilePage;


    constructor(page: ProfilePage) {
        this.updates = new Array<MyCustomerChangePassword>();
        this.customerRepository = new CustomersRepository();
        this.page = page;

    }

    listenToSubmitFormBtn() {
        const currentPassword = document.querySelector('.current-password_box') as HTMLInputElement
        const btn = document.querySelector('.password-change_btn') as HTMLInputElement
        const newPassword = document.querySelector('.new-password_box') as HTMLInputElement
        const checkPassword = document.querySelector('.check-password_box') as HTMLInputElement
        btn.addEventListener('click', async (event) => {
            event.preventDefault();
            let result;

            try {
                if ((newPassword as HTMLInputElement).value === (checkPassword as HTMLInputElement).value) {
                    result = await this.customerRepository.updateCustomerPassword({ version: this.page.getCustomerVersion(), currentPassword: currentPassword?.value, newPassword: newPassword?.value } as MyCustomerChangePassword)
                    await this.customerRepository.reloginCustomer({ email: result.email, password: newPassword?.value } as CustomerSignin);
                } else {
                    Toast.showToast(`Your new password and confirmation password do not match. Please confirm and try again.`, 5000, 'Error');
                }
            } catch (e) {
                if (e instanceof Error) {
                    Toast.showToast(`Unable to change password. ${e.message}`, 5000, 'Error');
                }
            }

            if (result) {
                this.page.updateCustomer(result);
                this.updates = [];
                this.page.disablePersonalDetailsForm();
                Toast.showToast('Password has been changed successfully!', 5000, 'Info');
            }
        })
    }

}