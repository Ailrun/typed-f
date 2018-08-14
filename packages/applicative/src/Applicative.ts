import { Fun } from '@typed-f/function';
import { Functor1, Functor2, Functor3, Functor4 } from '@typed-f/functor';
import * as T from '@typed-f/tagged';

interface ApplicativeBuilder<UnitType, ApType> {
  unit: UnitType;
  /**
   * @desc
   * alias of `unit`
   */
  of: UnitType;

  ap: ApType;
}
type AB<U, A> = ApplicativeBuilder<U, A>;

type A1U<Tag extends keyof T.Tag1List<any>, A0> = Fun<[A0], T.Tag1List<A0>[Tag]>;
type A2U<Tag extends keyof T.Tag2List<any, any>, A0, A1> = Fun<[A1], T.Tag2List<A0, A1>[Tag]>;
type A3U<Tag extends keyof T.Tag3List<any, any, any>, A0, A1, A2> = Fun<[A2], T.Tag3List<A0, A1, A2>[Tag]>;
type A4U<Tag extends keyof T.Tag4List<any, any, any, any>, A0, A1, A2, A3> = Fun<[A3], T.Tag4List<A0, A1, A2, A3>[Tag]>;

type A1A<Tag extends keyof T.Tag1List<any>, A0> = <R>(wf: T.Tag1List<Fun<[A0], R>>[Tag]) => T.Tag1List<R>[Tag];
type A2A<Tag extends keyof T.Tag2List<any, any>, A0, A1> = <R>(wf: T.Tag2List<A0, Fun<[A1], R>>[Tag]) => T.Tag2List<A0, R>[Tag];
type A3A<Tag extends keyof T.Tag3List<any, any, any>, A0, A1, A2> = <R>(wf: T.Tag3List<A0, A1, Fun<[A2], R>>[Tag]) => T.Tag3List<A0, A1, R>[Tag];
type A4A<Tag extends keyof T.Tag4List<any, any, any, any>, A0, A1, A2, A3> = <R>(wf: T.Tag4List<A0, A1, A2, Fun<[A3], R>>[Tag]) => T.Tag4List<A0, A1, A2, R>[Tag];

export interface Applicative1<Tag extends keyof T.Tag1List<any>, A0> extends Functor1<Tag, A0>, AB<A1U<Tag, A0>, A1A<Tag, A0>> {}
export interface Applicative2<Tag extends keyof T.Tag2List<any, any>, A0, A1> extends Functor2<Tag, A0, A1>, AB<A2U<Tag, A0, A1>, A2A<Tag, A0, A1>> {}
export interface Applicative3<Tag extends keyof T.Tag3List<any, any, any>, A0, A1, A2> extends Functor3<Tag, A0, A1, A2>, AB<A3U<Tag, A0, A1, A2>, A3A<Tag, A0, A1, A2>> {}
export interface Applicative4<Tag extends keyof T.Tag4List<any, any, any, any>, A0, A1, A2, A3> extends Functor4<Tag, A0, A1, A2, A3>, AB<A4U<Tag, A0, A1, A2, A3>, A4A<Tag, A0, A1, A2, A3>> {}
