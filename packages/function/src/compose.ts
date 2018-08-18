/*
 * Copyright 2018-present Junyoung Clare Jang
 */
import { id } from './';

export function compose(): typeof id;
export function compose<A0 extends any[], A1>(
  f0: (...args: A0) => A1,
): (...args: A0) => A1;
export function compose<A0 extends any[], A1, A2>(
  f1: (a1: A1) => A2,
  f0: (...args: A0) => A1,
): (...args: A0) => A2;
export function compose<A0 extends any[], A1, A2, A3>(
  f2: (a2: A2) => A3,
  f1: (a1: A1) => A2,
  f0: (...args: A0) => A1,
): (...args: A0) => A3;
export function compose<A0 extends any[], A1, A2, A3, A4>(
  f3: (a3: A3) => A4,
  f2: (a2: A2) => A3,
  f1: (a1: A1) => A2,
  f0: (...args: A0) => A1,
): (...args: A0) => A4;
export function compose<A0 extends any[], A1, A2, A3, A4, A5>(
  f4: (a4: A4) => A5,
  f3: (a3: A3) => A4,
  f2: (a2: A2) => A3,
  f1: (a1: A1) => A2,
  f0: (...args: A0) => A1,
): (...args: A0) => A5;
export function compose<A0 extends any[], A1, A2, A3, A4, A5, A6>(
  f5: (a5: A5) => A6,
  f4: (a4: A4) => A5,
  f3: (a3: A3) => A4,
  f2: (a2: A2) => A3,
  f1: (a1: A1) => A2,
  f0: (...args: A0) => A1,
): (...args: A0) => A6;
export function compose<A0 extends any[], A1, A2, A3, A4, A5, A6, A7>(
  f6: (a6: A6) => A7,
  f5: (a5: A5) => A6,
  f4: (a4: A4) => A5,
  f3: (a3: A3) => A4,
  f2: (a2: A2) => A3,
  f1: (a1: A1) => A2,
  f0: (...args: A0) => A1,
): (...args: A0) => A7;
export function compose<A0 extends any[], A1, A2, A3, A4, A5, A6, A7, A8>(
  f7: (a7: A7) => A8,
  f6: (a6: A6) => A7,
  f5: (a5: A5) => A6,
  f4: (a4: A4) => A5,
  f3: (a3: A3) => A4,
  f2: (a2: A2) => A3,
  f1: (a1: A1) => A2,
  f0: (...args: A0) => A1,
): (...args: A0) => A8;
export function compose<A0 extends any[], A1, A2, A3, A4, A5, A6, A7, A8, A9>(
  f8: (a8: A8) => A9,
  f7: (a7: A7) => A8,
  f6: (a6: A6) => A7,
  f5: (a5: A5) => A6,
  f4: (a4: A4) => A5,
  f3: (a3: A3) => A4,
  f2: (a2: A2) => A3,
  f1: (a1: A1) => A2,
  f0: (...args: A0) => A1,
): (...args: A0) => A9;
//tslint:disable-next-line: max-line-length
export function compose<A0 extends any[], A1, A2, A3, A4, A5, A6, A7, A8, A9, A10>(
  f9: (a9: A9) => A10,
  f8: (a8: A8) => A9,
  f7: (a7: A7) => A8,
  f6: (a6: A6) => A7,
  f5: (a5: A5) => A6,
  f4: (a4: A4) => A5,
  f3: (a3: A3) => A4,
  f2: (a2: A2) => A3,
  f1: (a1: A1) => A2,
  f0: (...args: A0) => A1,
): (...args: A0) => A10;
//tslint:disable-next-line: max-line-length
export function compose<A0 extends any[], A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11>(
  f10: (a10: A10) => A11,
  f9: (a9: A9) => A10,
  f8: (a8: A8) => A9,
  f7: (a7: A7) => A8,
  f6: (a6: A6) => A7,
  f5: (a5: A5) => A6,
  f4: (a4: A4) => A5,
  f3: (a3: A3) => A4,
  f2: (a2: A2) => A3,
  f1: (a1: A1) => A2,
  f0: (...args: A0) => A1,
): (...args: A0) => A11;
//tslint:disable-next-line: max-line-length
export function compose<A0 extends any[], A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12>(
  f11: (a10: A11) => A12,
  f10: (a10: A10) => A11,
  f9: (a9: A9) => A10,
  f8: (a8: A8) => A9,
  f7: (a7: A7) => A8,
  f6: (a6: A6) => A7,
  f5: (a5: A5) => A6,
  f4: (a4: A4) => A5,
  f3: (a3: A3) => A4,
  f2: (a2: A2) => A3,
  f1: (a1: A1) => A2,
  f0: (...args: A0) => A1,
): (...args: A0) => A12;
export function compose(
  ...fns: ((...args: any[]) => any)[]
): (...args: any[]) => any {
  if (fns.length === 0) {
    return id;
  }

  return function (...args) {
    return fns.reduceRight((acc, fn) => {
      return [fn(...acc)];
    }, args)[0];
  };
}
