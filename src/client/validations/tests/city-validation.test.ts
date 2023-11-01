import { describe, expect } from '@jest/globals';
import CityValidation from '../city-validation';
import DocumentDataFetcher from '../../../helpers/document-data-fetcher';

describe('CityValidation', () => {
  describe('checkCityName', () => {
    it('should return true if the city name is valid', () => {
      DocumentDataFetcher.getCityFromRegisterForm = jest
        .fn()
        .mockReturnValue('Minsk');
      const isNameValid = CityValidation.checkCityName('shipping');
      expect(isNameValid).toBe(true);
    });

    it('should return false if the city name is invalid', () => {
      DocumentDataFetcher.getCityFromRegisterForm = jest.fn(() => '');
      const isNameValid = CityValidation.checkCityName('shipping');
      expect(isNameValid).toBe(false);
    });
  });
});
