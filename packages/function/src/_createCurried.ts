/*
 * Copyright 2018-present Junyoung Clare Jang
 */
import { Fun } from './';

export function _createCurried<F extends Fun>(
  f: F, arity: number,
  args: any[],
) {
  function curried(this: any) {
    const length = arguments.length;

    if (length === 0) {
      return curried;
    }

    let index = length;
    const nextArgs = [];

    while (index--) {
      nextArgs[index] = arguments[index];
    }

    if (args.length + length >= arity) {
      return f.apply(this, args.concat(nextArgs).slice(0, arity));
    }

    return _createCurried(f, arity, args.concat(nextArgs));
  }

  return curried;
}
