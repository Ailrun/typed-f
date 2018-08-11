import { Fun } from './';

import { _createCurried } from './_createCurried';

interface CurriedFunApply<AS extends any[], F extends Function> extends Fun<AS, CurriedFun<F>> {}

type CurriedFun0<F extends Function> =
  F extends Fun ? (
    F extends Fun<[]> ?
      F :
      CurriedFunApply<[], F>
  ) :
  never;
type CurriedFun1<F extends Function> =
  F extends (a0: infer A0, ...args: infer A) => infer R ? (
    F extends Fun<[A0], R> ?
      F :
      CurriedFunApply<[A0], Fun<A, R>>
  ) :
  never;
type CurriedFun2<F extends Function> =
  F extends (a0: infer A0, a1: infer A1, ...args: infer A) => infer R ? (
    F extends Fun<[A0, A1], R> ?
      F :
      CurriedFunApply<[A0, A1], Fun<A, R>>
  ) :
  never;
type CurriedFun3<F extends Function> =
  F extends (a0: infer A0, a1: infer A1, a2: infer A2, ...args: infer A) => infer R ? (
    F extends Fun<[A0, A1, A2], R> ?
      F :
      CurriedFunApply<[A0, A1, A2], Fun<A, R>>
  ) :
  never;
type CurriedFun4<F extends Function> =
  F extends (a0: infer A0, a1: infer A1, a2: infer A2, a3: infer A3, ...args: infer A) => infer R ? (
    F extends Fun<[A0, A1, A2, A3], R> ?
      F :
      CurriedFunApply<[A0, A1, A2, A3], Fun<A, R>>
  ) :
  never;

export type CurriedFun<F extends Function> =
  & CurriedFun0<F>
  & CurriedFun1<F>
  & CurriedFun2<F>
  & CurriedFun3<F>
  & CurriedFun4<F>
  ;

export function curry<F extends Fun>(f: F, arity?: F extends Fun<infer A> ? A['length'] : number): CurriedFun<F> {
  arity = arity !== undefined ? arity : (f.length as F extends Fun<infer A> ? A['length'] : number);

  return _createCurried(f, arity, []) as any;
}
