import {
    AddressDraft, Customer, MyCustomerAddAddressAction, MyCustomerAddBillingAddressIdAction, MyCustomerAddShippingAddressIdAction, MyCustomerChangeAddressAction, MyCustomerRemoveAddressAction, MyCustomerRemoveBillingAddressIdAction,
    MyCustomerRemoveShippingAddressIdAction, MyCustomerSetDefaultBillingAddressAction,
    MyCustomerSetDefaultShippingAddressAction, MyCustomerUpdate
}
    from "@commercetools/platform-sdk";
import CustomersRepository from "../../../repositories/customers-repository";
import type ProfilePage from "../../../pages/profile";
import { countries } from "../registration-form/countries";
import Toast from "../../toast";
import StreetValidation from "../../../client/validations/customer-profile/street-validation";
import CityValidation from "../../../client/validations/customer-profile/city-validation";
import CountryValidator from "../../../client/validations/customer-profile/country-validation";
import PostCodeValidation from "../../../client/validations/customer-profile/post-code-validation";

type CheckboxUpdate =
    | MyCustomerSetDefaultShippingAddressAction
    | MyCustomerSetDefaultBillingAddressAction
    | MyCustomerRemoveShippingAddressIdAction
    | MyCustomerRemoveBillingAddressIdAction;

export default class AddressFormListener {
    private customerRepository: CustomersRepository;

    checkboxUpdates: CheckboxUpdate[] = [];

    page: ProfilePage;

    constructor(page: ProfilePage) {
        this.customerRepository = new CustomersRepository();
        this.checkboxUpdates = []
        this.page = page;
    }

    static listenToStreet(form: HTMLElement) {
        const input = form.querySelector('.street_box') as HTMLInputElement;
        input.addEventListener('input', (event) => {
            StreetValidation.validateStreet(form, (event.target as HTMLInputElement).value);
        });
    }

    static listenToCountry(form: HTMLElement) {
        const input = form.querySelector('.country_box') as HTMLInputElement;
        input.addEventListener('input', (event) => {
            const postalCode = form.querySelector('.postal_box') as HTMLInputElement;
            CountryValidator.validateCountry(form, postalCode.value, countries[(event.target as HTMLInputElement).value]);
        });
    }

    static listenToPostalCode(form: HTMLElement) {
        const input = form.querySelector('.postal_box') as HTMLInputElement;
        input.addEventListener('input', (event) => {
            const country = form.querySelector('.country_box') as HTMLInputElement;
            PostCodeValidation.validatePostalCode(form, (event.target as HTMLInputElement).value, countries[country.value]);
        });
    }

    static listenToCity(form: HTMLElement) {
        const input = form.querySelector('.city_box') as HTMLInputElement;
        input.addEventListener('input', (event) => {
            CityValidation.validateCity(form, (event.target as HTMLInputElement).value);
        });
    }

    addDefaultCheckboxListener(form: HTMLElement) {
        const checkbox = form.querySelector('.adress-default-checkbox');
        checkbox?.addEventListener('change', () => {
            const billing = form.classList.contains('Billing');
            const shipping = form.classList.contains('Shipping');
            const isDefault = (checkbox as HTMLInputElement).checked;
            if (shipping && isDefault) {
                this.checkboxUpdates.push({ action: 'setDefaultShippingAddress', addressId: form.id } as MyCustomerSetDefaultShippingAddressAction);
            }
            if (billing && isDefault) {
                this.checkboxUpdates.push({ action: 'setDefaultBillingAddress', addressId: form.id } as MyCustomerSetDefaultBillingAddressAction);
            }
            if (shipping && !isDefault) {
                this.checkboxUpdates.push({ action: 'removeShippingAddressId', addressId: form.id } as MyCustomerRemoveShippingAddressIdAction)
            }
            if (billing && !isDefault) {
                this.checkboxUpdates.push({ action: 'removeBillingAddressId', addressId: form.id } as MyCustomerRemoveBillingAddressIdAction)
            }
            return null;
        })
    }

    startListen() {
        const addressForms = document.querySelectorAll('.address-form');
        addressForms.forEach(form => {
            AddressFormListener.listenToStreet(form as HTMLElement);
            AddressFormListener.listenToCity(form as HTMLElement);
            AddressFormListener.listenToCountry(form as HTMLElement);
            AddressFormListener.listenToPostalCode(form as HTMLElement);
            this.addListenerToAddressForm(form as HTMLElement)
        });
    }

    addListenerToAddressForm(form: HTMLElement) {
        const street = form.querySelector('.street_box') as HTMLInputElement;
        const city = form.querySelector('.city_box') as HTMLInputElement;
        const country = form.querySelector('.country_box') as HTMLInputElement;
        const postal = form.querySelector('.postal_box') as HTMLInputElement;
        const btn = form.querySelector('.address-change_btn') as HTMLInputElement;
        const deleteBtn = form.querySelector('.delete-icon') as HTMLInputElement;
        btn.disabled = true;
        form.addEventListener('input', () => {
            const isValid = AddressFormListener.validate(city.value, street.value, country.value, postal.value)
            if (!isValid) {
                btn.disabled = true;
            }
            else {
                btn.disabled = false;
            }
        })
        this.addDefaultCheckboxListener(form);
        btn.addEventListener('click', async (event) => {
            event.preventDefault();
            const baseAddress = { city: city.value, streetName: street.value, country: countries[country.value], postalCode: postal.value } as AddressDraft
            await this.handleChangeAddress(baseAddress, form.id);
        })
        deleteBtn.addEventListener('click', async () => {
            await this.handleDeleteAddress(form.id);
        })
    }

    static validate(city: string, street: string, country: string, postalCode: string) {
        return PostCodeValidation.checkPostalCode(postalCode, countries[country]) &&
            CountryValidator.checkCountry(countries[country]) &&
            CityValidation.checkCityName(city) &&
            StreetValidation.checkStreetName(street);
    }


    addListenerToAddAddressForm(form: HTMLElement) {
        AddressFormListener.listenToStreet(form);
        AddressFormListener.listenToCity(form as HTMLElement);
        AddressFormListener.listenToCountry(form as HTMLElement);
        AddressFormListener.listenToPostalCode(form as HTMLElement);
        const street = form.querySelector('.street_box') as HTMLInputElement;
        const city = form.querySelector('.city_box') as HTMLInputElement;
        const country = form.querySelector('.country_box') as HTMLInputElement;
        const postal = form.querySelector('.postal_box') as HTMLInputElement;
        const btn = form.querySelector('.address-change_btn') as HTMLInputElement;
        btn.disabled = true;
        form.addEventListener('input', () => {
            const isValid = AddressFormListener.validate(city.value, street.value, country.value, postal.value)
            if (!isValid) {
                btn.disabled = true;
            }
            else {
                btn.disabled = false;
            }
        })
        const isDefaultFormCheckbox = form.querySelector('.adress-default-checkbox') as HTMLInputElement

        btn.addEventListener('click', async (event) => {
            event.preventDefault();
            const baseAddress = { key: AddressFormListener.generateRandomStringId(), city: city.value, streetName: street.value, country: countries[country.value], postalCode: postal.value } as AddressDraft
            try {
                await this.handleAddAddress(baseAddress);
                await this.handleSetDefaultAddress(form, isDefaultFormCheckbox.checked, baseAddress.key || '');
                await this.addToShippingOrBillingIds(form, baseAddress.key || '');
                Toast.showToast('Address has been added successfully!', 5000, 'Info');
            } catch (e) {
                Toast.showToast(`Unable to add customer.`, 5000, 'Error');
            }
        })
    }

    async handleChangeAddress(address: AddressDraft, addressId: string) {
        const update = { action: 'changeAddress', addressId, address } as MyCustomerChangeAddressAction;
        let result;
        try {
            result = await this.customerRepository.updateCustomerDetails({ version: this.page.getCustomerVersion(), actions: [update, ...this.checkboxUpdates] } as MyCustomerUpdate)
        } catch (e) {
            Toast.showToast(`Unable to update customer.`, 5000, 'Error');
        }
        if (result) {
            this.page.updateCustomer(result);
            this.checkboxUpdates = [];
            this.page.disableAddressForm(addressId);
            Toast.showToast('Address has been updated successfully!', 5000, 'Info');
        }
    }

    async handleSetDefaultAddress(form: HTMLElement, isAddressDefaultValue: boolean, addressKey: string) {
        const billing = form.classList.contains('Billing');
        const shipping = form.classList.contains('Shipping');
        let setAddressAction: MyCustomerSetDefaultShippingAddressAction | MyCustomerSetDefaultBillingAddressAction | null = null;
        if (shipping && isAddressDefaultValue) {
            setAddressAction = { action: 'setDefaultShippingAddress', addressKey } as MyCustomerSetDefaultShippingAddressAction
        }
        if (billing && isAddressDefaultValue) {
            setAddressAction = { action: 'setDefaultBillingAddress', addressKey } as MyCustomerSetDefaultBillingAddressAction
        }
        if (setAddressAction != null) {
            const result = await this.customerRepository.updateCustomerDetails({ version: this.page.getCustomerVersion(), actions: [setAddressAction] } as MyCustomerUpdate)
            this.page.updateCustomer(result);
            this.checkboxUpdates = [];
        }

    }

    async addToShippingOrBillingIds(form: HTMLElement, addressKey: string) {
        const billing = form.classList.contains('Billing');
        const addIdToShippingAddresses = { action: 'addShippingAddressId', addressKey } as MyCustomerAddShippingAddressIdAction;
        const addIdToBillingAddresses = { action: 'addBillingAddressId', addressKey } as MyCustomerAddBillingAddressIdAction;
        const setAddressIdAction = billing ? addIdToBillingAddresses : addIdToShippingAddresses;
        const result = await this.customerRepository.updateCustomerDetails({ version: this.page.getCustomerVersion(), actions: [setAddressIdAction] } as MyCustomerUpdate)
        this.page.updateCustomer(result);
        this.checkboxUpdates = [];
    }

    async handleDeleteAddress(addressId: string) {
        const update = { action: 'removeAddress', addressId } as MyCustomerRemoveAddressAction;
        let result;
        try {
            result = await this.customerRepository.updateCustomerDetails({ version: this.page.getCustomerVersion(), actions: [update, ...this.checkboxUpdates] } as MyCustomerUpdate)
        } catch (e) {
            Toast.showToast(`Unable to delete customer.`, 5000, 'Error');
        }
        if (result) {
            this.page.updateCustomer(result);
            this.checkboxUpdates = [];
            Toast.showToast('Address has been deleted successfully!', 5000, 'Info');
        }
    }

    async handleAddAddress(address: AddressDraft): Promise<Customer | undefined> {
        const update = { action: 'addAddress', address } as MyCustomerAddAddressAction;
        const result = await this.customerRepository.updateCustomerDetails({ version: this.page.getCustomerVersion(), actions: [update] } as MyCustomerUpdate)
        this.page.updateCustomer(result);
        this.checkboxUpdates = [];

        return result;
    }

    private static generateRandomStringId(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let randomId = '';

        for (let i = 0; i < 6; i += 1) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }

        return randomId;
    }
}