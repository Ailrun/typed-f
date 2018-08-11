import { Applicative } from '@typed-f/applicative';
import { Fun } from '@typed-f/function';

export interface Monad<T> extends Applicative<T> {
  /**
   * @desc
   * Retype `Functor` methods
   */

  map<U>(f: Fun<[T], U>): Monad<U>;
  lift<U>(f: Fun<[T], U>): Monad<U>;
  fmap<U>(f: Fun<[T], U>): Monad<U>;

  /**
   * @desc
   * Retype `Functor` methods
   */

  unit(arg: T): Monad<T>;
  of(arg: T): Monad<T>;

  ap<U>(wf: Monad<Fun<[T], U>>): Monad<U>;

  /**
   * @desc
   * `Monad` methods
   */

  bind<U>(wf: Fun<[T], Monad<U>>): Monad<U>;
  /**
   * @desc
   * alias of `bind`
   */
  chain<U>(wf: Fun<[T], Monad<U>>): Monad<U>;
}
