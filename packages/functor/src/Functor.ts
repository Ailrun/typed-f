import { Fun } from '@typed-f/function';
import * as T from '@typed-f/tagged';

interface FunctorBuilder<MapType> {
  map: MapType;
  /**
   * @desc
   * alias of `map`
   */
  lift: MapType;
  /**
   * @desc
   * alias of `map`
   */
  fmap: MapType;
}
type FB<M> = FunctorBuilder<M>;

type F1M<Tag extends keyof T.Tag1List<any>, A0> = <R>(
  f: Fun<[A0], R>,
) => T.Tag1List<R>[Tag];
type F2M<Tag extends keyof T.Tag2List<any, any>, A0, A1> = <R>(
  f: Fun<[A1], R>,
) => T.Tag2List<A0, R>[Tag];
type F3M<Tag extends keyof T.Tag3List<any, any, any>, A0, A1, A2> = <R>(
  f: Fun<[A2], R>,
) => T.Tag3List<A0, A1, R>[Tag];
type F4M<Tag extends keyof T.Tag4List<any, any, any, any>, A0, A1, A2, A3> = <R>(
  f: Fun<[A3], R>,
) => T.Tag4List<A0, A1, A2, R>[Tag];

export interface Functor1<Tag extends keyof T.Tag1List<any>, A0> extends T.Tagged<Tag>, FB<F1M<Tag, A0>> {}
export interface Functor2<Tag extends keyof T.Tag2List<any, any>, A0, A1> extends T.Tagged<Tag>, FB<F2M<Tag, A0, A1>> {}
export interface Functor3<Tag extends keyof T.Tag3List<any, any, any>, A0, A1, A2> extends T.Tagged<Tag>, FB<F3M<Tag, A0, A1, A2>> {}
export interface Functor4<Tag extends keyof T.Tag4List<any, any, any, any>, A0, A1, A2, A3> extends T.Tagged<Tag>, FB<F4M<Tag, A0, A1, A2, A3>> {}

export namespace Functor {
  export function map<T, U>(f: Fun<[T], U>): <Tag extends keyof T.Tag1List<any>>(
    wa: Functor1<Tag, T>,
  ) => T.Tag1List<U>[Tag] {
    return function (wa) {
      if ('map' in wa) {
        return (wa as any).map(f);
      }

      throw new Error('Parameter is not a functor. You cannot call the function map with non-functor.');
    }
  }
}
