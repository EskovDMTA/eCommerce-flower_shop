import DocumentDataFetcher from '../document-data-fetcher';

describe('DocumentDataFetcher', () => {
  describe('getDataFromInput', () => {
    it('should return the value of an input element', () => {
      document.body.innerHTML = '<input class="test-input" value="test-value">';
      const result = DocumentDataFetcher.getDataFromInput('.test-input');
      expect(result).toBe('test-value');
    });

    it('should return an empty string if the input element is not found', () => {
      document.body.innerHTML = '';
      const result = DocumentDataFetcher.getDataFromInput('.test-input');
      expect(result).toBe('');
    });
  });

  describe('getDataFromCheckboxInput', () => {
    it('should return the checked status of a checkbox element', () => {
      document.body.innerHTML = '<input class="test-checkbox" type="checkbox" checked>';
      const result = DocumentDataFetcher.getDataFromCheckboxInput('.test-checkbox');
      expect(result).toBe(true);
    });

    it('should return false if the checkbox element is not checked', () => {
      document.body.innerHTML = '<input class="test-checkbox" type="checkbox">';
      const result = DocumentDataFetcher.getDataFromCheckboxInput('.test-checkbox');
      expect(result).toBe(false);
    });

    it('should return false if the checkbox element is not found', () => {
      document.body.innerHTML = '';
      const result = DocumentDataFetcher.getDataFromCheckboxInput('.test-checkbox');
      expect(result).toBe(false);
    });
  });

  describe('getPasswordFromLoginForm', () => {
    it('should return the password from the login form', () => {
      document.body.innerHTML = '<input class="login-password_box" value="test-password">';
      const result = DocumentDataFetcher.getPasswordFromLoginForm();
      expect(result).toBe('test-password');
    });
  });

  describe('getMailFromLoginForm', () => {
    it('should return the mail from the login form', () => {
      document.body.innerHTML = '<input class="login-login_box" value="mail-test">';
      const result = DocumentDataFetcher.getMailFromLoginForm();
      expect(result).toBe('mail-test');
    });
  });

  describe('getMailFromRegistrationForm', () => {
    it('should return the mail from the registration form', () => {
      document.body.innerHTML = '<input class="register-email_box" value="register-mail-test">';
      const result = DocumentDataFetcher.getMailFromRegistrationForm();
      expect(result).toBe('register-mail-test');
    });
  });

  describe('getPasswordFromRegistrationForm', () => {
    it('should return the password from the registration form', () => {
      document.body.innerHTML = '<input class="register-password_box" value="register-password-test">';
      const result = DocumentDataFetcher.getPasswordFromRegistrationForm();
      expect(result).toBe('register-password-test');
    });
  });

  describe('getFirstNameFromRegisterForm', () => {
    it('should return the first name from the registration form', () => {
      document.body.innerHTML = '<input class="register-first-name_box" value="register-first-name_box">';
      const result = DocumentDataFetcher.getFirstNameFromRegisterForm();
      expect(result).toBe('register-first-name_box');
    });
  });

  describe('getLastNameFromRegisterForm', () => {
    it('should return the last name from the registration form', () => {
      document.body.innerHTML = '<input class="register-last-name_box" value="register-last-name_box">';
      const result = DocumentDataFetcher.getLastNameFromRegisterForm();
      expect(result).toBe('register-last-name_box');
    });
  });

  describe('getBirthdayDateFromRegisterForm', () => {
    it('should return the birthdat date from the registration form', () => {
      document.body.innerHTML = '<input class="register-date-birth_box" value="register-date-birth_box">';
      const result = DocumentDataFetcher.getBirthdayDateFromRegisterForm();
      expect(result).toBe('register-date-birth_box');
    });
  });

  describe('getStreetFromRegisterForm', () => {
    it('should return the street from the registration form', () => {
      document.body.innerHTML = '<input class="register-street_box" value="register-street_box">';
      const result = DocumentDataFetcher.getStreetFromRegisterForm();
      expect(result).toBe('register-street_box');
    });
  });

  describe('getCityFromRegisterForm', () => {
    it('should return the city from the registration form', () => {
      document.body.innerHTML = '<input class="register-city_box" value="register-city_box">';
      const result = DocumentDataFetcher.getCityFromRegisterForm();
      expect(result).toBe('register-city_box');
    });
  });

    describe('getPostalCodeFromRegisterForm', () => {
      it('should return the postal code from the registration form', () => {
        document.body.innerHTML = '<input class="register-postal_box" value="register-postal_box">';
        const result = DocumentDataFetcher.getPostalCodeFromRegisterForm();
        expect(result).toBe('register-postal_box');
      });
    });

  describe('getDefaultAddressFromRegisterForm', () => {
    it('should return the false if checkbox false the registration form', () => {
      document.body.innerHTML = '<input class="adress-default-checkbox" value=-checkbox">';
      const result = DocumentDataFetcher.getDefaultAddressFromRegisterForm();
      expect(result).toBe(false);
    });
  });

  describe('getBillingCityFromRegisterForm', () => {
    it('should return the billing city from the registration form', () => {
      document.body.innerHTML = '<input class="register-city_box-billing" value="register-city_box-billing">';
      const result = DocumentDataFetcher.getBillingCityFromRegisterForm();
      expect(result).toBe("register-city_box-billing");
    });
  });

  describe('getBillingPostalCodeFromRegisterForm', () => {
    it('should return the billing postal code from the registration form', () => {
      document.body.innerHTML = '<input class="register-postal_box-billing" value="register-postal_box-billing">';
      const result = DocumentDataFetcher.getBillingPostalCodeFromRegisterForm();
      expect(result).toBe("register-postal_box-billing");
    });
  });

});
