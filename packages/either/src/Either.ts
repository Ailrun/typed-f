/*
 * Copyright 2018-present Junyoung Clare Jang
 */
import { Fun } from '@typed-f/function';
import { MatchPatterns, Matchable } from '@typed-f/matchable';
import { Monad2 } from '@typed-f/monad';
import { Setoid2 } from '@typed-f/setoid';

type EitherTag = '__typed_f__Either__';
const EitherTag: EitherTag = '__typed_f__Either__';

declare module '@typed-f/tagged' {
  export interface Tag2List<L, R> {
    [EitherTag]: Either<L, R>;
  }
}

export interface EitherPatterns<L, R, U> extends MatchPatterns<U> {
  left(l: L): U;
  right(r: R): U;
}

//tslint:disable-next-line: max-line-length
abstract class BaseEither<L, R> implements Matchable, Setoid2<EitherTag>, Monad2<EitherTag, L, R> {
  //tslint:disable-next-line: variable-name
  public __typed_f__tag__: EitherTag = EitherTag;
  protected abstract _kind: Either.Kind;

  public abstract isLeft(): this is Left<L, R>;
  public abstract isRight(): this is Right<L, R>;
  public abstract leftOr(def: L): L;
  public abstract leftOrThrow(err: Error): L;
  public abstract leftOrCompute(f: Fun<[R], L>): L;
  public abstract rightOr(def: R): R;
  public abstract rightOrThrow(err: Error): R;
  public abstract rightOrCompute(f: Fun<[L], R>): R;

  public abstract matchWith<U>(cases: EitherPatterns<L, R, U>): U;
  public abstract equals(other: Either<any, any>): boolean;
  public abstract map<U>(f: Fun<[R], U>): Either<L, U>;
  public abstract ap<U>(f: Either<L, Fun<[R], U>>): Either<L, U>;
  public abstract bind<U>(f: Fun<[R], Either<L, U>>): Either<L, U>;

  public caseOf = this.matchWith;
  public notEquals(other: Either<any, any>): boolean {
    return !this.equals(other);
  }
  public lift = this.map;
  public fmap = this.map;
  public unit<U>(v: U): Either<any, U> {
    return new Right(v);
  }
  public of = this.unit;
  public chain = this.bind;
}

export class Left<L, R> extends BaseEither<L, R> {
  private readonly _value: L;
  protected _kind: Either.Kind.Left = Either.Kind.Left;

  public get value(): L {
    return this._value;
  }

  public constructor(value: L) {
    super();
    this._value = value;
  }

  public isLeft(): this is Left<L, R> {
    return true;
  }
  public isRight(): this is Right<L, R> {
    return false;
  }
  public leftOr(_def: L): L {
    return this._value;
  }
  public leftOrThrow(_err: Error): L {
    return this._value;
  }
  public leftOrCompute(_f: Fun<[R], L>): L {
    return this._value;
  }
  public rightOr(def: R): R {
    return def;
  }
  public rightOrThrow(err: Error): R {
    throw err;
  }
  public rightOrCompute(f: Fun<[L], R>): R {
    return f(this._value);
  }

  public matchWith<U>(cases: EitherPatterns<L, R, U>): U {
    return cases.left(this._value);
  }
  public equals(other: Either<any, any>): boolean {
    if (!(other instanceof BaseEither) ||
        other.isRight()) {
      return false;
    }

    if (typeof this._value === 'object' &&
        this._value != undefined &&
        typeof (this._value as any).equals === 'function') {
      return Boolean((this._value as any).equals(other._value));
    }

    return this._value === other._value;
  }

  public map<U>(_f: Fun<[R], U>): Either<L, U> {
    return this as Left<L, any>;
  }
  public ap<U>(_f: Either<L, Fun<[R], U>>): Either<L, U> {
    return this as Left<L, any>;
  }
  public bind<U>(_f: Fun<[R], Either<L, U>>): Either<L, U> {
    return this as Left<L, any>;
  }
}

export class Right<L, R> extends BaseEither<L, R> {
  private readonly _value: R;
  protected _kind: Either.Kind.Right = Either.Kind.Right;

  public get value(): R {
    return this._value;
  }

  public constructor(value: R) {
    super();
    this._value = value;
  }

  public isLeft(): this is Left<L, R> {
    return false;
  }
  public isRight(): this is Right<L, R> {
    return true;
  }
  public leftOr(def: L): L {
    return def;
  }
  public leftOrThrow(err: Error): L {
    throw err;
  }
  public leftOrCompute(f: Fun<[R], L>): L {
    return f(this._value);
  }
  public rightOr(_def: R): R {
    return this._value;
  }
  public rightOrThrow(_err: Error): R {
    return this._value;
  }
  public rightOrCompute(_f: Fun<[L], R>): R {
    return this._value;
  }

  public matchWith<U>(cases: EitherPatterns<L, R, U>): U {
    return cases.right(this._value);
  }
  public equals(other: Either<any, any>): boolean {
    if (!(other instanceof BaseEither) ||
        other.isLeft()) {
      return false;
    }

    if (typeof this._value === 'object' &&
        this._value != undefined &&
        typeof (this._value as any).equals === 'function') {
      return (this._value as any).equals(other._value);
    }

    return this._value === other._value;
  }

  public map<U>(f: Fun<[R], U>): Either<L, U> {
    return new Right(f(this._value));
  }
  public ap<U>(f: Either<L, Fun<[R], U>>): Either<L, U> {
    if (f.isLeft()) {
      return f as Either<L, any>;
    }

    return this.map(f._value);
  }
  public bind<U>(f: Fun<[R], Either<L, U>>): Either<L, U> {
    return f(this._value);
  }
}

export type Either<L, R> =
  | Left<L, R>
  | Right<L, R>
  ;

export namespace Either {
  export enum Kind {
    Left,
    Right,
  }

  export function unit<R>(value: R): Either<any, R> {
    return new Right(value);
  }
  export const of = unit;

  export function sequenceObject<L, O extends object>(
    obj: { [K in keyof O]: Either<L, O[K]> },
  ): Either<L, O> {
    const entries = (Object.keys(obj) as (keyof O)[])
      .map((key): [keyof O, Either<L, O[keyof O]>] => [key, obj[key]]);
    const leftEntries = entries
      .filter((entry): entry is [keyof O, Left<L, any>] => entry[1].isLeft());

    if (leftEntries.length > 0) {
      return new Left(leftEntries[0][1].value);
    }

    const result = entries
      .filter((entry): entry is [keyof O, Right<L, O[keyof O]>] => {
        return !entry[1].isLeft();
      })
      .reduce<{}>((acc, [key, { value }]) => {
        return {
          ...acc,
          [key]: value,
        };
      }, {}) as O;

    return new Right(result);
  }

  export function sequenceArray<L, R>(array: Either<L, R>[]): Either<L, R[]> {
    return array.reduce((acc: Either<L, R[]>, mayv) => {
      return acc.ap(mayv.map((v) => (arr: R[]) => [...arr, v]));
    }, new Right([]));
  }

  export function map<L, R, U>(
    f: Fun<[R], U>,
  ): Fun<[Either<L, R>], Either<L, U>> {
    return function (eitherv) {
      return eitherv.map(f);
    };
  }
}
