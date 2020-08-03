const isValidEmail = require('../../utils/isValidEmail');

describe('isValidEmail helper method', () => {
    const validEmail = 'hello@email.com';
    const invalidEmailOne = 'thisisnotanemail';
    const invalidEmailTwo = 'thisisnotanemail@email';
    const invalidEmailThree = 'thisisnotanemail.com';

    it('should return true if string is an email', () => {
        expect(isValidEmail(validEmail)).toBeTruthy();
    });
    it('should return false if string is not an email', () => {
        expect(isValidEmail(invalidEmailOne)).toBeFalsy();
        expect(isValidEmail(invalidEmailTwo)).toBeFalsy();
        expect(isValidEmail(invalidEmailThree)).toBeFalsy();
    });
});
