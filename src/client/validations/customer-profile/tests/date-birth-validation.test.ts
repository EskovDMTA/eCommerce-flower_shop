import DocumentDataFetcher from '../../../../helpers/document-data-fetcher';
import DateBirthValidation from '../date-birth-validation';


describe('Date of birth Validation', () => {
  describe('check client age', () => {
    it('return true if age is greater than 13', () => {
      DocumentDataFetcher.getBirthdayDateFromRegisterForm = jest
        .fn()
        .mockReturnValue('1990-05-05');
      const isNameValid = DateBirthValidation.checkClientAgeVerification('1990-05-05');
      expect(isNameValid).toBe(true);
    });

    it('return false if age is less than 13', () => {
      DocumentDataFetcher.getBirthdayDateFromRegisterForm = jest
        .fn()
        .mockReturnValue('2020-05-05');
      const isNameValid = DateBirthValidation.checkClientAgeVerification('2020-05-05');
      expect(isNameValid).toBe(false);
    });
  });
});
