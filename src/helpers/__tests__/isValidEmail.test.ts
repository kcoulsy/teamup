import isValidEmail from '../isValidEmail';

describe('isValidEmail', () => {
    it('should return true if string contains a valid', () => {
        const realEmail = 'test@test.com';

        expect(isValidEmail(realEmail)).toBe(true);
    });

    it('should return true if string contains a number', () => {
        const fakeEmail = 'notanemail';

        expect(isValidEmail(fakeEmail)).toBe(false);
    });
});
