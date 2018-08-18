import { Fun } from '@typed-f/function';
import { compose } from '@typed-f/function/dist/compose';

describe('compose', () => {
  it('should return a function that runs each function once from right to left', () => {
    const fn1: Fun<[number], number> = jest.fn((x: number) => x + 1);
    const fn2: Fun<[number], number[]> = jest.fn((size: number) => new Array(size).fill(0));
    compose(fn2, fn1)(0);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
  });

  it('should return a function that returns the result of finally executed function', () => {
    const fn1: Fun<[string], string> = jest.fn((str: string) => str.toUpperCase());
    const fn2: Fun<[string], string[]> = jest.fn((str: string) => str.split(''));
    const fn3: Fun<[string[]], number[]> = jest.fn((arr: string[]) => arr.map((str) => str.charCodeAt(0)));
    const fn4: Fun<[number[]], number[]> = jest.fn((arr: number[]) => arr.map((code) => code + 1));
    const fn5: Fun<[number[]], string> = jest.fn((arr: number[]) => String.fromCharCode(...arr));

    const fnComposed = compose(fn5, fn4, fn3, fn2, fn1);

    expect(fn5).toHaveLastReturnedWith(fnComposed('abc'));
  });

  it('should return a function that runs next function with the result of previous funciton', () => {
    const fn1: Fun<[number], string> = jest.fn((x: number) => x.toString());
    const fn2: Fun<[string], RegExp> = jest.fn((str: string) => new RegExp(str));
    const fn3: Fun<[RegExp], Fun<[string], boolean>> = jest.fn((regexp: RegExp) => (x: string) => regexp.test(x));

    compose(fn3, fn2, fn1)(5210312);

    expect(fn2).toHaveBeenLastCalledWith((fn1 as jest.Mock).mock.results[0].value);
    expect(fn3).toHaveBeenLastCalledWith((fn2 as jest.Mock).mock.results[0].value);
  });

  it('should return an function that does not call next functions if some function throws error', () => {
    const fn1: Fun<[number], number> = jest.fn((x: number) => x * x);
    const fn2: Fun<[number], number> = jest.fn((x: number) => {
      if (x >= 0) {
        throw new Error('Input should be smaller than 0');
      }

      return Math.sqrt(-x);
    });
    const fn3: Fun<[number], number> = jest.fn((x: number) => x + 1);
    const fn4: Fun<[number], string> = jest.fn((x: number) => x.toFixed(2));

    expect(() => {
      compose(fn4, fn3, fn2, fn1)(1);
    }).toThrowError();
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn3).toHaveBeenCalledTimes(0);
  });
});
