import { describe, expect } from '@jest/globals';
import StreetValidation from '../city-validation';
import DocumentDataFetcher from '../../../helpers/document-data-fetcher';

describe('StreetValidation', () => {
  describe('check street validation', () => {
    it('should return true if the street name is valid', () => {
      DocumentDataFetcher.getCityFromRegisterForm = jest
        .fn()
        .mockReturnValue('prospect prospect');
      const isNameValid = StreetValidation.checkCityName('shipping');
      expect(isNameValid).toBe(true);
    });

    it('should return false if the street name is invalid', () => {
      DocumentDataFetcher.getCityFromRegisterForm = jest.fn(() => ' 123');
      const isNameValid = StreetValidation.checkCityName('shipping');
      expect(isNameValid).toBe(false);
    });
  });
});
