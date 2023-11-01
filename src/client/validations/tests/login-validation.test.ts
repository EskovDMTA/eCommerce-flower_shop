import { describe, expect } from '@jest/globals';
import LoginValidation from '../login-validation';
import LoginFormError from '../validation-error/login-form-errors';
import RegistrationFormError from '../validation-error/registration-form-error';

jest.mock('../validation-error/login-form-errors');
jest.mock('../validation-error/registration-form-error');

describe('LoginValidation', () => {
  describe('check mail for spaces', () => {
    it('should return true if login dont have space', () => {
      const spaceValid = LoginValidation.checkSpace('notspaces@gmail.com');
      expect(spaceValid).toBe(true);
    });
    it('should return false if login have space', () => {
      const spaceValid = LoginValidation.checkSpace(' notspaces@gmail.com ');
      expect(spaceValid).toBe(false);
    });
  });

  describe('check mail for mail format', () => {
    it('return true if the format is valid', () => {
      const spaceValid = LoginValidation.checkMailFormat(
        'trueformats@gmail.com'
      );
      expect(spaceValid).toBe(true);
    });
    it('return false if the format is not valid', () => {
      const spaceValid = LoginValidation.checkMailFormat(
        'notformat@gmail@.com'
      );
      expect(spaceValid).toBe(false);
    });
  });

  describe('check mail for domain format', () => {
    it('return true if the domain is valid', () => {
      const spaceValid = LoginValidation.checkMailFormat('true@gmail.com');
      expect(spaceValid).toBe(true);
    });
    it('return false if the domain is not valid', () => {
      const spaceValid = LoginValidation.checkMailFormat('falset@g.c.');
      expect(spaceValid).toBe(false);
    });
  });

  describe('check mail for @ symbol', () => {
    it('return true if mail contain @', () => {
      const spaceValid = LoginValidation.checkAtSymbol('true@gmail.com');
      expect(spaceValid).toBe(true);
    });
    it('return false if mail does not contain @', () => {
      const spaceValid = LoginValidation.checkAtSymbol('falset$go.com');
      expect(spaceValid).toBe(false);
    });
  });

  describe('check mail validation', () => {
    it('return true if mail valid', () => {
      const isValid = LoginValidation.validateLogin('true@gmail.com', 'login');
      expect(isValid).toBe(true);
      expect(
        RegistrationFormError.removeLoginInvalidBackground
      ).not.toHaveBeenCalled();
      expect(LoginFormError.loginErrors).toHaveBeenCalledWith([]);
    });
    it('return false if mail not valid', () => {
      const isValid = LoginValidation.validateLogin(
        ' false@@gmail.com',
        'login'
      );
      expect(isValid).toBe(false);
      expect(LoginFormError.removeLoginInvalidBackground).toHaveBeenCalled();
      expect(LoginFormError.loginErrors).toHaveBeenCalledWith([
        LoginValidation.VALIDATION_ERRORS.mailFormat,
      ]);
    });
  });
});
