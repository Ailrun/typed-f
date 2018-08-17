/*
 * Copyright 2018-present Junyoung Clare Jang
 */
import { Fun } from './';

import { _createCurried } from './_createCurried';

//tslint:disable-next-line: ban-types
interface CurriedFunApply<AS extends any[], F extends Function>
  extends Fun<AS, CurriedFun<F>> {}

//tslint:disable-next-line: ban-types
type CurriedFun0<F extends Function> =
  F extends Fun ? (
    F extends Fun<[]> ?
      F :
      CurriedFunApply<[], F>
  ) :
  never;
//tslint:disable-next-line: ban-types
type CurriedFun1<F extends Function> =
  F extends (a0: infer A0, ...args: infer A) => infer R ? (
    F extends Fun<[A0], R> ?
      F :
      CurriedFunApply<[A0], Fun<A, R>>
  ) :
  never;
//tslint:disable-next-line: ban-types
type CurriedFun2<F extends Function> =
  F extends (a0: infer A0, a1: infer A1, ...args: infer A) => infer R ? (
    F extends Fun<[A0, A1], R> ?
      F :
      CurriedFunApply<[A0, A1], Fun<A, R>>
  ) :
  never;
//tslint:disable-next-line: ban-types
type CurriedFun3<F extends Function> =
  //tslint:disable-next-line: max-line-length
  F extends (a0: infer A0, a1: infer A1, a2: infer A2, ...args: infer A) => infer R ? (
    F extends Fun<[A0, A1, A2], R> ?
      F :
      CurriedFunApply<[A0, A1, A2], Fun<A, R>>
  ) :
  never;
//tslint:disable-next-line: ban-types
type CurriedFun4<F extends Function> =
  //tslint:disable-next-line: max-line-length
  F extends (a0: infer A0, a1: infer A1, a2: infer A2, a3: infer A3, ...args: infer A) => infer R ? (
    F extends Fun<[A0, A1, A2, A3], R> ?
      F :
      CurriedFunApply<[A0, A1, A2, A3], Fun<A, R>>
  ) :
  never;

//tslint:disable-next-line: ban-types
export type CurriedFun<F extends Function> =
  & CurriedFun0<F>
  & CurriedFun1<F>
  & CurriedFun2<F>
  & CurriedFun3<F>
  & CurriedFun4<F>
  ;

/**
 * @todo
 * Return valid type for few arities like 0, 1, 2, 3, 4, 5, 6
 * (We cannot give valid type for all arities since
 * there is no type arithematic operators for literal type).
 */
export function curry<F extends Fun>(
  f: F,
  arity: F extends Fun<infer A> ? A['length'] : number = f.length as any,
): CurriedFun<F> {
  return _createCurried(f, arity, []) as any;
}
