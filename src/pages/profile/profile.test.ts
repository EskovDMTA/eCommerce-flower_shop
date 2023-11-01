/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Address, Customer } from '@commercetools/platform-sdk';
import CustomersRepository from '../../repositories/customers-repository';
import ProfilePage from '.';

jest.mock('../../repositories/customers-repository');

describe('ProfilePage', () => {
    let profilePage: ProfilePage;
    let mockCustomerDetails: Customer;
    let mockCustomersRepository: jest.Mocked<CustomersRepository>

    beforeAll(() => {
        mockCustomerDetails = {
            id: '1',
            version: 1,
            createdAt: '',
            lastModifiedAt: '',
            addresses: [{ id: 'abc123', country: 'Poland', city: 'Gdansk', streetName: ' someStreet' }] as Address[],
            shippingAddressIds: ['abc123'],
            isEmailVerified: true,
            authenticationMode: '',
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '1990-01-01',
            email: 'johndoe@example.com',
        };

        mockCustomersRepository = new CustomersRepository() as jest.Mocked<CustomersRepository>;

        mockCustomersRepository.getCustomerDetails.mockResolvedValue(mockCustomerDetails);

        profilePage = new ProfilePage('profile-page', mockCustomersRepository);
    });

    it('should initialize correctly', async () => {
        await profilePage.init();
        expect(profilePage.customerDetails).toEqual(mockCustomerDetails);
    });

    it('should render the page correctly', () => {
        profilePage.customerDetails = mockCustomerDetails;
        const rendered = profilePage.render();
        
        expect(rendered).toBeDefined();
        expect(rendered.id).toEqual('profile-page')

        expect(rendered.querySelector('.profile-section')).not.toBeNull();
        const addressForms = rendered.querySelectorAll('.address-form');
        expect(addressForms.length).toEqual(1);

        expect(addressForms[0]).not.toBeUndefined();
        expect(addressForms[0]).not.toBeNull();
        expect(addressForms[0]!.id).toEqual('abc123');

        const subtitle = addressForms[0].querySelector('.profile-subtitle');
        expect(subtitle).not.toBeUndefined();
        expect(subtitle).not.toBeNull();
        expect(subtitle!.textContent).toEqual('Shipping Address');
    });

});