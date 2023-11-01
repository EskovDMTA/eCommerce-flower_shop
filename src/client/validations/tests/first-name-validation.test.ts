import { describe, expect } from '@jest/globals';
import DocumentDataFetcher from '../../../helpers/document-data-fetcher';
import FirstNameValidation from '../first-name-validation';

describe('FirstName validation', () => {
  describe('check first name value', () => {
    it('should return true if the first name is valid', () => {
      DocumentDataFetcher.getFirstNameFromRegisterForm = jest
        .fn()
        .mockReturnValue('Quentin');
      const isNameValid = FirstNameValidation.checkFirstName();
      expect(isNameValid).toBe(true);
    });

    it('should return false if the first name is not valid', () => {
      DocumentDataFetcher.getFirstNameFromRegisterForm = jest
        .fn()
        .mockReturnValue(123);
      const isNameValid = FirstNameValidation.checkFirstName();
      expect(isNameValid).toBe(false);
    });
  });
});
