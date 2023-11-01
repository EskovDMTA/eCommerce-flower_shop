import { describe, expect } from '@jest/globals';
import PasswordValidator from '../password-validation';


describe('PasswordValidation', () => {
  describe('check space in password', () => {
    it('should return true if password dont have space', () => {
      const spaceValid = PasswordValidator.checkSpace('notspaces@gmail.com');
      expect(spaceValid).toBe(true);
    });
    it('should return false if password have space', () => {
      const spaceValid = PasswordValidator.checkSpace(' notspaces@gmail.com ');
      expect(spaceValid).toBe(false);
    });
  });

  describe('check password length', () => {
    it('return true if the password length is greater than or equal to 8', () => {
      const spaceValid = PasswordValidator.checkLength('12345678');
      expect(spaceValid).toBe(true);
    });
    it('return false if password length is less than 8 ', () => {
      const spaceValid = PasswordValidator.checkLength('1234567');
      expect(spaceValid).toBe(false);
    });
  });

  describe('check capital letter in password', () => {
    it('return true if the password contains a capital letter', () => {
      const spaceValid = PasswordValidator.checkUppercaseLetter('qwertyuQ');
      expect(spaceValid).toBe(true);
    });
    it('return false if the password does not contain a capital letter', () => {
      const spaceValid = PasswordValidator.checkUppercaseLetter('qwertyuq');
      expect(spaceValid).toBe(false);
    });
  });

  describe('check lowercase letter in password', () => {
    it('return true if the password contains a lowercase letter', () => {
      const spaceValid = PasswordValidator.checkLowercaseLetter('QWERTYUq');
      expect(spaceValid).toBe(true);
    });
    it('return false if the password does not contains a lowercase letter', () => {
      const spaceValid = PasswordValidator.checkLowercaseLetter('QWERTYUI');
      expect(spaceValid).toBe(false);
    });
  });

  describe('check number in password', () => {
    it('return true if the password contains a number', () => {
      const isValid = PasswordValidator.checkNumber('12345678');
      expect(isValid).toBe(true);
    });

    it('return false if the password does not contains a number letter', () => {
      const isValid = PasswordValidator.checkNumber('qwertyui');
      expect(isValid).toBe(false);
    });
  });

  describe('check special symbol in password', () => {
    it('return true if the password contains a special symbol', () => {
      const isValid = PasswordValidator.checkSpecialSymbol('@<>,.!@#$');
      expect(isValid).toBe(true);
    });
    it('return false if the password does not contains a special symbol', () => {
      const isValid = PasswordValidator.checkSpecialSymbol('qwertyui');
      expect(isValid).toBe(false);
    });
  });

});
