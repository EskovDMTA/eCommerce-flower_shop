import { describe, expect } from '@jest/globals';
import DocumentDataFetcher from '../../../helpers/document-data-fetcher';
import LastNameValidation from '../last-name-validation';

describe('LastName validation', () => {
  describe('check last name value', () => {
    it('should return true if the last name is valid', () => {
      DocumentDataFetcher.getLastNameFromRegisterForm = jest
        .fn()
        .mockReturnValue('Tarantino');
      const isNameValid = LastNameValidation.checkLastName();
      expect(isNameValid).toBe(true);
    });

    it('should return false if the last name is not valid', () => {
      DocumentDataFetcher.getLastNameFromRegisterForm = jest
        .fn()
        .mockReturnValue(123);
      const isNameValid = LastNameValidation.checkLastName();
      expect(isNameValid).toBe(false);
    });
  });
});
