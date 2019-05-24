import { flip } from '@typed-f/function/dist/flip';

describe('flip', () => {
  it('should return a function that takes one argument two times when first argument is a function that takes one argument two times', () => {
    const test1 = (a: string) => (b: number) => a + b;
    expect(typeof flip(test1)).toBe('function');
    expect(typeof flip(test1)(5)).toBe('function');
    expect(flip(test1)(5)('abc')).toBe('abc5');

    const test2 = (x: { [key: string]: number }) => (key: string) => x[key];
    expect(typeof flip(test2)).toBe('function');
    expect(typeof flip(test2)('myKey')).toBe('function');
    expect(flip(test2)('myKey')({ myKey: 4 })).toBe(4);
  });
});
