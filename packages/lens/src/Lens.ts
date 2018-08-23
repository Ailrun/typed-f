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
}
