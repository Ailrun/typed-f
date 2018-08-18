import { Fun } from '@typed-f/function';
import { curry } from '@typed-f/function/dist/curry';

describe('curry', () => {
  it('should return a function that can be used as fully curried function', () => {
    const testFn1: Fun<[string, string], string> = jest.fn((a, b) => '');
    curry(testFn1)('abc')('cde');
    expect(testFn1).toHaveBeenLastCalledWith('abc', 'cde');

    const testFn2: Fun<[number, string, object], object[]> = jest.fn((a, b, c) => []);
    curry(testFn2)(5)('cde')({ a: '54', b: [1, 2, 3] });
    expect(testFn2).toHaveBeenLastCalledWith(5, 'cde', { a: '54', b: [1, 2, 3] });
  });

  it('should return a function that accepts calling without parameter', () => {
    const testFn1: Fun<[RegExp], boolean> = jest.fn((a) => true);
    curry(testFn1)()()()()(/hi/);
    expect(testFn1).toHaveBeenLastCalledWith(/hi/);

    const testFn2: Fun<[object[], Date], Promise<string>> = jest.fn(async (a, b) => '');
    //tslint:disable-next-line: no-floating-promises
    curry(testFn2)()([{ hi: 'world', answer: 42 }, { result: false }])()()()(new Date(20));
    expect(testFn2).toHaveBeenLastCalledWith([{ hi: 'world', answer: 42 }, { result: false }], new Date(20));
  });

  it('should accept arity to restrict the number of parameter those should be passed', () => {
    const testFn1: Fun<[string, number?], boolean> = jest.fn((a, b) => false);
    curry(testFn1, 1)('by');
    expect(testFn1).toHaveBeenLastCalledWith('by');

    const testFn2: Fun<[any, any?, any?], RegExp> = jest.fn((a) => /a/);
    /**
     * @fixme
     * After fixing the return type of `curry`, please remove `as any`.
     */
    (curry(testFn2, 3)({ key: 'value' }) as any)()(5, 4);
    expect(testFn2).toHaveBeenLastCalledWith({ key: 'value' }, 5, 4);
  });
});
