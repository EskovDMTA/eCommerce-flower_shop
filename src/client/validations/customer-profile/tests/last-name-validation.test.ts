import { describe, expect } from '@jest/globals';

import LastNameValidation from '../last-name-validation';
import DocumentDataFetcher from '../../../../helpers/document-data-fetcher';

describe('LastName validation', () => {
  describe('check last name value', () => {
    it('should return true if the last name is valid', () => {
      DocumentDataFetcher.getLastNameFromRegisterForm = jest
        .fn()
        .mockReturnValue('Tarantino');
      const isNameValid = LastNameValidation.checkLastName(DocumentDataFetcher.getLastNameFromRegisterForm());
      expect(isNameValid).toBe(true);
    });

    it('should return false if the last name is not valid', () => {
      DocumentDataFetcher.getLastNameFromRegisterForm = jest
        .fn()
        .mockReturnValue(123);
      const isNameValid = LastNameValidation.checkLastName(DocumentDataFetcher.getLastNameFromRegisterForm());
      expect(isNameValid).toBe(false);
    });
  });
});
