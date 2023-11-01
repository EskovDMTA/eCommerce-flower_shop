import { describe, expect } from '@jest/globals';
import CountryValidator from '../country-validation';
import DocumentDataFetcher from '../../../../helpers/document-data-fetcher';

describe('CountryValidation', () => {
  describe('checkCountryName', () => {
    it('should return false if the country name is not valid', () => {
      DocumentDataFetcher.getCountryFromRegisterForm = jest
        .fn()
        .mockReturnValue('Americanec');
      const isNameValid = CountryValidator.checkCountry('shipping');
      expect(isNameValid).toBe(false);
    });
  });
});
