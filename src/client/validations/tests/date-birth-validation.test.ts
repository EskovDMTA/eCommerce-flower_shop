import { describe, expect } from '@jest/globals';
import DateBirthValidation from '../date-birth-validation';
import DocumentDataFetcher from '../../../helpers/document-data-fetcher';

describe('Date of birth Validation', () => {
  describe('check client age', () => {
    it('return true if age is greater than 13', () => {
      DocumentDataFetcher.getBirthdayDateFromRegisterForm = jest
        .fn()
        .mockReturnValue('1990-05-05');
      const isNameValid = DateBirthValidation.checkClientAgeVerification();
      expect(isNameValid).toBe(true);
    });

    it('return false if age is less than 13', () => {
      DocumentDataFetcher.getBirthdayDateFromRegisterForm = jest
        .fn()
        .mockReturnValue('2020-05-05');
      const isNameValid = DateBirthValidation.checkClientAgeVerification();
      expect(isNameValid).toBe(false);
    });
  });
});
