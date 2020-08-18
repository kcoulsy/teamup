import containsNumber from '../containsNumber';

describe('containsNumber', () => {
    it('should return true if string contains a number', () => {
        const stringWithNumber = 'hello123';

        expect(containsNumber(stringWithNumber)).toBe(true);
    });

    it('should return true if string contains a number', () => {
        const stringWithoutNumber = 'hello';

        expect(containsNumber(stringWithoutNumber)).toBe(false);
    });
});
