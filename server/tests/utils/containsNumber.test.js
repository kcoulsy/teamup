const containsNumber = require('../../src/utils/containsNumber');

describe('containsNumber helper method', () => {
    const stringWithNumber = 'hello123';
    const stringWithoutNumber = 'hello';

    it('should return true if string does contain an number', () => {
        expect(containsNumber(stringWithNumber)).toBeTruthy();
    });
    it('should return false if string does not contain an number', () => {
        expect(containsNumber(stringWithoutNumber)).toBeFalsy();
    });
});
