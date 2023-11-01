import DocumentDataFetcher from '../../../../helpers/document-data-fetcher';
import RegistrationFormError from '../../validation-error/registration-form-error';
import CityValidation from '../city-validation';

describe('CityValidation', () => {
  beforeEach(() => {
    jest.spyOn(DocumentDataFetcher, 'getCityFromRegisterForm').mockReturnValue('New York');
    jest.spyOn(DocumentDataFetcher, 'getBillingCityFromRegisterForm').mockReturnValue('Los Angeles');
    jest.spyOn(RegistrationFormError, 'removeCityInvalidBackground').mockImplementation();
    jest.spyOn(RegistrationFormError, 'cityErrors').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('checkCityName', () => {
    it('should return true for a valid city name', () => {

      const result = CityValidation.checkCityName('shipping');
      expect(result).toBe(true);
    });

    it('should return false for a city name without special characters', () => {
      jest.spyOn(DocumentDataFetcher, 'getCityFromRegisterForm').mockReturnValue('New York');
      const result = CityValidation.checkCityName('shipping');
      expect(result).toBe(true);
    });
  });
});
