import { Fun } from '@typed-f/function';

export interface Functor<T> {
  /**
   * @desc
   * `Functor` methods
   */

  map<U>(f: Fun<[T], U>): Functor<U>;
  /**
   * @desc
   * alias of `map`
   */
  lift<U>(f: Fun<[T], U>): Functor<U>;
  /**
   * @desc
   * alias of `map`
   */
  fmap<U>(f: Fun<[T], U>): Functor<U>;
}
