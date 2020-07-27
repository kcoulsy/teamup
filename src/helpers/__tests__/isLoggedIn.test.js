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

    it('returns false if token is not a string', () => {
        const tokenNull = null;
        const tokenUndefined = undefined;
        const tokenNumber = 123;
        const tokenFunc = () => {};

        expect(isLoggedIn(tokenNull)).toBe(false);
        expect(isLoggedIn(tokenUndefined)).toBe(false);
        expect(isLoggedIn(tokenNumber)).toBe(false);
        expect(isLoggedIn(tokenFunc)).toBe(false);
    });
});
