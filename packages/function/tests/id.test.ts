import { id } from '@typed-f/function/dist/id';

describe('id', () => {
  it('should return its argument itself', () => {
    expect(id(5)).toEqual(5);
    expect(id(undefined)).toEqual(undefined);
    expect(id({ x: 4 })).toEqual({ x: 4 });
    expect(id([1, 2, 'ab'])).toEqual([1, 2, 'ab']);
    expect(id(/abc/)).toEqual(/abc/);
  });
});
