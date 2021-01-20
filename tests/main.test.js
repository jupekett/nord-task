const { summa } = require('.test-imports.js');

test('adds 1 + 2 to equal 3', () => {
    expect(summa(1,2)).toBe(3);
});