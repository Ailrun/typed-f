/*
 * Copyright 2018-present Junyoung Clare Jang
 */
import { Fun } from '@typed-f/function';

export class Lens<A, S, B = A, T = S> {
  protected _get: Fun<[S], A>;
  protected _set: Fun<[S], Fun<[B], T>>;

  public constructor(
    get: Fun<[S], A>,
    set: Fun<[S], Fun<[B], T>>,
  ) {
    this._get = get;
    this._set = set;
  }

  public get(): Fun<[S], A> {
    return this._get;
  }

  public set(): Fun<[S], Fun<[B], T>> {
    return this._set;
  }

  public map(): Fun<[S], Fun<[Fun<[A], B>], T>> {
    return (s) => (f) => this._set(s)(f(this._get(s)));
  }

  public compose<AA, BB = AA>(other: Lens<AA, A, BB, B>) {
    return new Lens<AA, S, BB, T>(
      (s: S) => other.get()(this._get(s)),
      (s: S) => (bb: BB) => this._set(s)((other.set()(this._get(s))(bb))),
    );
  }
}

export class LensS<A, S> extends Lens<A, S> {
  public constructor(
    get: Fun<[S], A>,
    set: Fun<[S], Fun<[A], S>>,
  ) {
    super(get, set);
  }

  public makeInner<K extends keyof A>(key: K): LensS<A[K], A> {
    return new LensGenerator<A>().fromKey(key);
  }

  public focusTo<K extends keyof A>(key: K): LensS<A[K], S> {
    return new LensS(
      (s: S) => this._get(s)[key],
      (s: S) => (n: A[K]) => {
        const innerRes = copy(this._get(s));
        innerRes[key] = n;
        return this._set(s)(innerRes);
      },
    );
  }
}

export type LensSProxy<A, S> = LensS<A, S> & {
  [K in keyof A]: LensSProxy<A[K], S>;
};

export class LensGenerator<S> {
  public fromKey<K extends keyof S>(key: K): LensS<S[K], S> {
    return new LensS(
      (s: S) => s[key],
      (s: S) => (b: S[K]) => {
        const res = copy(s);
        res[key] = b;
        return res;
      },
    );
  }

  //tslint:disable: max-line-length
  public fromKeys(
    ...keys: []
  ): LensS<S, S>;
  public fromKeys<K0 extends keyof S>(
    ...keys: [K0]
  ): LensS<S[K0], S>;
  public fromKeys<K0 extends keyof S, K1 extends keyof S[K0]>(
    ...keys: [K0, K1]
  ): LensS<S[K0][K1], S>;
  public fromKeys<K0 extends keyof S, K1 extends keyof S[K0], K2 extends keyof S[K0][K1]>(
    ...keys: [K0, K1, K2]
  ): LensS<S[K0][K1][K2], S>;
  public fromKeys<K0 extends keyof S, K1 extends keyof S[K0], K2 extends keyof S[K0][K1], K3 extends keyof S[K0][K1][K2]>(
    ...keys: [K0, K1, K2, K3]
  ): LensS<S[K0][K1][K2][K3], S>;
  public fromKeys<K0 extends keyof S, K1 extends keyof S[K0], K2 extends keyof S[K0][K1], K3 extends keyof S[K0][K1][K2], K4 extends keyof S[K0][K1][K2][K3]>(
    ...keys: [K0, K1, K2, K3, K4]
  ): LensS<S[K0][K1][K2][K3][K4], S>;
  public fromKeys<K0 extends keyof S, K1 extends keyof S[K0], K2 extends keyof S[K0][K1], K3 extends keyof S[K0][K1][K2], K4 extends keyof S[K0][K1][K2][K3], K5 extends keyof S[K0][K1][K2][K3][K4]>(
    ...keys: [K0, K1, K2, K3, K4, K5]
  ): LensS<S[K0][K1][K2][K3][K4][K5], S>;
  public fromKeys<K0 extends keyof S, K1 extends keyof S[K0], K2 extends keyof S[K0][K1], K3 extends keyof S[K0][K1][K2], K4 extends keyof S[K0][K1][K2][K3], K5 extends keyof S[K0][K1][K2][K3][K4], K6 extends keyof S[K0][K1][K2][K3][K4][K5]>(
    ...keys: [K0, K1, K2, K3, K4, K5, K6]
  ): LensS<S[K0][K1][K2][K3][K4][K5][K6], S>;
  public fromKeys<P>(
    ...keys: any[]
  ): LensS<P, S>;
  //tslint:enable: max-line-length

  public fromKeys(...keys: string[]): LensS<any, S> {
    const rootLens: LensS<S, S> = new LensS(
      (s: S) => s,
      (_s: S) => (t: S) => t,
    );

    return keys.reduce<LensS<any, S>>((acc, key) => {
      return acc.focusTo(key);
    }, rootLens);
  }

  public byProxy(): LensSProxy<S, S> {
    const rootLens: LensS<S, S> = new LensS(
      (s: S) => s,
      (_s: S) => (t: S) => t,
    );

    return proxyfy(rootLens);
  }
}

function proxyfy<A, S>(lens: LensS<A, S>): LensSProxy<A, S> {
  return new Proxy(lens, {
    get(target, prop) {
      if ((target as any)[prop] !== undefined) {
        return (target as any)[prop];
      }

      return proxyfy((target as LensS<any, S>).focusTo(prop));
    },
  }) as LensSProxy<A, S>;
}

function copy<T>(x: T): T {
  if (Array.isArray(x)) {
    return x.slice() as any;
  }

  if (typeof x === 'object' && x !== null) {
    return {
      ...x as any,
    };
  }

  return x;
}
