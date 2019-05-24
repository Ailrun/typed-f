/*
 * Copyright 2018-present Junyoung Clare Jang
 */
import { Fun } from './';

export function flip<A, B, R>(f: Fun<[A], Fun<[B], R>>): Fun<[B], Fun<[A], R>> {
  return function (b: B) {
    return function (a: A) {
      return f(a)(b);
    };
  };
}
