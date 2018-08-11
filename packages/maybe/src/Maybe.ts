import { Fun } from '@typed-f/function';
import { MatchPatterns, Matchable } from '@typed-f/matchable';
import { Monad } from '@typed-f/monad';
import { Setoid } from '@typed-f/setoid';

export interface MaybePatterns<T, U> extends MatchPatterns<U> {
  just(v: T): U;
  nothing(): U;
}

abstract class BaseMaybe<T> implements Matchable, Setoid<T>, Monad<T> {
  protected abstract _kind: Maybe.Kind;

  public abstract isJust(): this is Just<T>;
  public abstract isNothing(): this is Nothing<any>;
  public abstract valueOr(def: T): T;
  public abstract valueOrThrow(err: Error): T;
  public abstract valueOrCompute(f: Fun<[], T>): T;

  public abstract matchWith<U>(cases: MaybePatterns<T, U>): U;
  public abstract equals<U>(other: Maybe<U>): boolean;
  public abstract map<U>(f: Fun<[T], U>): Maybe<U>;
  public abstract ap<U>(f: Maybe<Fun<[T], U>>): Maybe<U>;
  public abstract bind<U>(f: Fun<[T], Maybe<U>>): Maybe<U>;

  public caseOf = this.matchWith;
  public notEquals<U>(other: Maybe<U>): boolean {
    return !this.equals(other);
  }
  public lift = this.map;
  public fmap = this.map;
  public unit<U>(v: U): Maybe<U> {
    return new Just(v);
  }
  public of = this.unit;
  public chain = this.bind;
}

export class Nothing<T> extends BaseMaybe<T> {
  protected _kind: Maybe.Kind.Nothing = Maybe.Kind.Nothing;

  public isJust(): this is Just<T> {
    return false;
  }
  public isNothing(): this is Nothing<any> {
    return true;
  }
  public valueOr(def: T): T {
    return def;
  }
  public valueOrThrow(err: Error): T {
    throw err;
  }
  public valueOrCompute(f: Fun<[], T>): T {
    return f();
  }

  public matchWith<U>(cases: MaybePatterns<T, U>): U {
    return cases.nothing();
  }
  public equals<U>(other: Maybe<U>): boolean {
    return other instanceof BaseMaybe && other.isNothing();
  }

  public map<U>(_f: Fun<[T], U>): Maybe<U> {
    return this as Nothing<any>;
  }
  public ap<U>(_f: Maybe<Fun<[T], U>>): Maybe<U> {
    return this as Nothing<any>;
  }
  public bind<U>(_f: Fun<[T], Maybe<U>>): Maybe<U> {
    return this as Nothing<any>;
  }
}

export class Just<T> extends BaseMaybe<T> {
  private readonly _value: T;
  protected _kind: Maybe.Kind.Just = Maybe.Kind.Just;

  public get value(): T {
    return this._value;
  }
  public valueOrThrow(_err: Error): T {
    return this._value;
  }
  public valueOrCompute(_f: Fun<[], T>): T {
    return this._value;
  }

  public constructor(value: T) {
    super();
    this._value = value;
  }

  public isJust(): this is Just<T> {
    return true;
  }
  public isNothing(): this is Nothing<any> {
    return false;
  }
  public valueOr(_def: T) {
    return this._value;
  }

  public matchWith<U>(cases: MaybePatterns<T, U>): U {
    return cases.just(this._value);
  }
  /**
   * @todo
   * Should be tested with something like `Maybe<Maybe<number>>`
   */
  public equals<U>(other: Maybe<U>): boolean {
    if (!(other instanceof BaseMaybe) ||
        !other.isJust()) {
      return false;
    }

    if (typeof this._value === 'object' &&
        this._value != null &&
        typeof (this._value as any).equals === 'function') {
      return (this._value as any).equals(other.value);
    }

    return this._value === (other.value as any);
  }
  public map<U>(f: Fun<[T], U>): Maybe<U> {
    return new Just(f(this._value));
  }
  public ap<U>(f: Maybe<Fun<[T], U>>): Maybe<U> {
    if (f.isNothing()) {
      return new Nothing();
    }

    return this.map(f.value);
  }
  public bind<U>(f: Fun<[T], Maybe<U>>): Maybe<U> {
    return f(this.value);
  }
}

export type Maybe<T> =
  | Nothing<T>
  | Just<T>
  ;

export namespace Maybe {
  export enum Kind {
    Nothing,
    Just,
  }

  export function unit<T>(value: T): Maybe<T> {
    return new Just(value);
  }
  export const of = unit;

  export function from<T>(value: T): Just<T>;
  export function from<T>(value?: null): Nothing<T>;
  export function from<T>(value?: T | null): Maybe<T> {
    if (value == null) {
      return new Nothing();
    }

    return new Just(value);
  }

  export function maybe<T>(value: T): Just<T>;
  export function maybe<T>(value?: null): Nothing<T>;
  export function maybe<T>(value?: T | null): Maybe<T> {
    return from<T>(value as any);
  }

  export function sequenceObject<O>(obj: { [K in keyof O]: Maybe<O[K]> }): Maybe<O> {
    const entries = (Object.keys(obj) as (keyof O)[])
      .map((key): [keyof O, Maybe<O[keyof O]>] => [key, obj[key]]);
    
    if (entries.filter(([, value]) => value.isNothing()).length) {
      return new Nothing();
    }

    const result = entries
      .filter((pair): pair is [keyof O, Just<O[keyof O]>] => !pair[1].isNothing())
      .reduce((acc, [key, { value }]) => {
        return {
          ...acc,
          [key]: value,
        };
      }, {}) as O;

    return new Just(result);
  }

  export function sequenceArray<T>(array: Maybe<T>[]): Maybe<T[]> {
    return array.reduce((acc: Maybe<T[]>, mayv) => {
      return acc.ap(mayv.map((v) => (arr: T[]) => [...arr, v]));
    }, from<T[]>([]));
  }

  export function map<T, U>(f: Fun<[T], U>): Fun<[Maybe<T>], Maybe<U>> {
    return function (mayv) {
      return mayv.map(f);
    };
  }
}
