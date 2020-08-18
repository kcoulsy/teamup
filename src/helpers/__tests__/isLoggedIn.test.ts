import isLoggedIn from '../isLoggedIn';

describe('isLoggedIn helper function', () => {
    it('returns true if token is passed as a string', () => {
        const token = 'thisismytoken';

        expect(isLoggedIn(token)).toBe(true);
    });

    it('returns false if token is passed as an empty string', () => {
        const token = '';

        expect(isLoggedIn(token)).toBe(false);
    });
});
