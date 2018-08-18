/*
 * Copyright 2018-present Junyoung Clare Jang
 */
import { id } from './';

export function pipe(): typeof id;
export function pipe<A0 extends any[], A1>(
  f0: (...args: A0) => A1,
): (...args: A0) => A1;
export function pipe<A0 extends any[], A1, A2>(
  f0: (...args: A0) => A1,
  f1: (a1: A1) => A2,
): (...args: A0) => A2;
export function pipe<A0 extends any[], A1, A2, A3>(
  f0: (...args: A0) => A1,
  f1: (a1: A1) => A2,
  f2: (a2: A2) => A3,
): (...args: A0) => A3;
export function pipe<A0 extends any[], A1, A2, A3, A4>(
  f0: (...args: A0) => A1,
  f1: (a1: A1) => A2,
  f2: (a2: A2) => A3,
  f3: (a3: A3) => A4,
): (...args: A0) => A4;
export function pipe<A0 extends any[], A1, A2, A3, A4, A5>(
  f0: (...args: A0) => A1,
  f1: (a1: A1) => A2,
  f2: (a2: A2) => A3,
  f3: (a3: A3) => A4,
  f4: (a4: A4) => A5,
): (...args: A0) => A5;
export function pipe<A0 extends any[], A1, A2, A3, A4, A5, A6>(
  f0: (...args: A0) => A1,
  f1: (a1: A1) => A2,
  f2: (a2: A2) => A3,
  f3: (a3: A3) => A4,
  f4: (a4: A4) => A5,
  f5: (a5: A5) => A6,
): (...args: A0) => A6;
export function pipe<A0 extends any[], A1, A2, A3, A4, A5, A6, A7>(
  f0: (...args: A0) => A1,
  f1: (a1: A1) => A2,
  f2: (a2: A2) => A3,
  f3: (a3: A3) => A4,
  f4: (a4: A4) => A5,
  f5: (a5: A5) => A6,
  f6: (a6: A6) => A7,
): (...args: A0) => A7;
export function pipe<A0 extends any[], A1, A2, A3, A4, A5, A6, A7, A8>(
  f0: (...args: A0) => A1,
  f1: (a1: A1) => A2,
  f2: (a2: A2) => A3,
  f3: (a3: A3) => A4,
  f4: (a4: A4) => A5,
  f5: (a5: A5) => A6,
  f6: (a6: A6) => A7,
  f7: (a7: A7) => A8,
): (...args: A0) => A8;
export function pipe<A0 extends any[], A1, A2, A3, A4, A5, A6, A7, A8, A9>(
  f0: (...args: A0) => A1,
  f4: (a4: A4) => A5,
  f3: (a3: A3) => A4,
  f2: (a2: A2) => A3,
  f1: (a1: A1) => A2,
  f5: (a5: A5) => A6,
  f6: (a6: A6) => A7,
  f7: (a7: A7) => A8,
  f8: (a8: A8) => A9,
): (...args: A0) => A9;
//tslint:disable-next-line: max-line-length
export function pipe<A0 extends any[], A1, A2, A3, A4, A5, A6, A7, A8, A9, A10>(
  f0: (...args: A0) => A1,
  f1: (a1: A1) => A2,
  f2: (a2: A2) => A3,
  f3: (a3: A3) => A4,
  f4: (a4: A4) => A5,
  f5: (a5: A5) => A6,
  f6: (a6: A6) => A7,
  f7: (a7: A7) => A8,
  f8: (a8: A8) => A9,
  f9: (a9: A9) => A10,
): (...args: A0) => A10;
//tslint:disable-next-line: max-line-length
export function pipe<A0 extends any[], A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11>(
  f0: (...args: A0) => A1,
  f1: (a1: A1) => A2,
  f2: (a2: A2) => A3,
  f3: (a3: A3) => A4,
  f4: (a4: A4) => A5,
  f5: (a5: A5) => A6,
  f6: (a6: A6) => A7,
  f7: (a7: A7) => A8,
  f8: (a8: A8) => A9,
  f9: (a9: A9) => A10,
  f10: (a10: A10) => A11,
): (...args: A0) => A11;
//tslint:disable-next-line: max-line-length
export function pipe<A0 extends any[], A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12>(
  f0: (...args: A0) => A1,
  f1: (a1: A1) => A2,
  f6: (a6: A6) => A7,
  f2: (a2: A2) => A3,
  f3: (a3: A3) => A4,
  f4: (a4: A4) => A5,
  f5: (a5: A5) => A6,
  f7: (a7: A7) => A8,
  f8: (a8: A8) => A9,
  f9: (a9: A9) => A10,
  f10: (a10: A10) => A11,
  f11: (a10: A11) => A12,
): (...args: A0) => A12;
export function pipe(
  ...fns: ((...args: any[]) => any)[]
): (...args: any[]) => any {
  if (fns.length === 0) {
    return id;
  }

  return function (...args) {
    return fns.reduce((acc, fn) => {
      return [fn(...acc)];
    }, args)[0];
  };
}
