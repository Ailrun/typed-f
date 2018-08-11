import { Fun } from '@typed-f/function';
import { Functor } from '@typed-f/functor';

export interface Applicative<T> extends Functor<T> {
  /**
   * @desc
   * Retype `Functor` methods
   */

  map<U>(f: Fun<[T], U>): Applicative<U>;
  lift<U>(f: Fun<[T], U>): Applicative<U>;
  fmap<U>(f: Fun<[T], U>): Applicative<U>;

  /**
   * @desc
   * `Applicative` methods
   */

  unit(arg: T): Applicative<T>;
  /**
   * @desc
   * alias of `unit`
   */
  of(arg: T): Applicative<T>;

  ap<U>(wf: Applicative<Fun<[T], U>>): Applicative<U>;
}
