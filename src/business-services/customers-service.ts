import type {
  Customer,
  CustomerDraft,
  CustomerSignInResult,
  CustomerSignin,
} from '@commercetools/platform-sdk';
import CustomersRepository from '../repositories/customers-repository';
import UserService from './user-service';
import Toast from '../components/toast';

export default class CustomersService {
private customersRepository : CustomersRepository;

constructor(){
  this.customersRepository = new CustomersRepository();
}

  async signUp(customer: CustomerDraft): Promise<CustomerSignInResult> {
    try{
      const customerProfile = await this.customersRepository.createCustomer(customer);
      Toast.showToast("Successfully registered!", 8000, 'Info');
      UserService.update();
      return customerProfile;
    }
    catch(e){
      if(e instanceof Error)
       {      
        Toast.showToast(e.message, 5000, 'Error');
       }
       throw e;
    }
  }

  async signIn(customer: CustomerSignin): Promise<CustomerSignInResult> {
      const result = await this.customersRepository.loginCustomer(customer);
      UserService.update();
      return result;
  }

  async getCustomerDetails(): Promise<Customer> {
    return this.customersRepository.getCustomerDetails();
  }
}
