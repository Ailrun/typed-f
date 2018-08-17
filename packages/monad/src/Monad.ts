/*
 * Copyright 2018-present Junyoung Clare Jang
 */
import { Applicative1, Applicative2, Applicative3, Applicative4 } from '@typed-f/applicative';
import { Fun } from '@typed-f/function';
import * as T from '@typed-f/tagged';

interface MonadBuilder<BindType> {
  bind: BindType;
  /**
   * @desc
   * alias of `bind`
   */
  chain: BindType;
}
type MB<B> = MonadBuilder<B>;

type M1B<Tag extends keyof T.Tag1List<any>, A0> = <R>(
  wf: Fun<[A0], T.Tag1List<R>[Tag]>,
) => T.Tag1List<R>[Tag];
type M2B<Tag extends keyof T.Tag2List<any, any>, A0, A1> = <R>(
  wf: Fun<[A1], T.Tag2List<A0, R>[Tag]>,
) => T.Tag2List<A0, R>[Tag];
type M3B<Tag extends keyof T.Tag3List<any, any, any>, A0, A1, A2> = <R>(
  wf: Fun<[A2], T.Tag3List<A0, A1, R>[Tag]>,
) => T.Tag3List<A0, A1, R>[Tag];
//tslint:disable-next-line: max-line-length
type M4B<Tag extends keyof T.Tag4List<any, any, any, any>, A0, A1, A2, A3> = <R>(
  wf: Fun<[A3], T.Tag4List<A0, A1, A2, R>[Tag]>,
) => T.Tag4List<A0, A1, A2, R>[Tag];

export interface Monad1<Tag extends keyof T.Tag1List<any>, A0>
  extends Applicative1<Tag, A0>, MB<M1B<Tag, A0>> {}
export interface Monad2<Tag extends keyof T.Tag2List<any, any>, A0, A1>
  extends Applicative2<Tag, A0, A1>, MB<M2B<Tag, A0, A1>> {}
export interface Monad3<Tag extends keyof T.Tag3List<any, any, any>, A0, A1, A2>
  extends Applicative3<Tag, A0, A1, A2>, MB<M3B<Tag, A0, A1, A2>> {}
//tslint:disable-next-line: max-line-length
export interface Monad4<Tag extends keyof T.Tag4List<any, any, any, any>, A0, A1, A2, A3>
  extends Applicative4<Tag, A0, A1, A2, A3>, MB<M4B<Tag, A0, A1, A2, A3>> {}
