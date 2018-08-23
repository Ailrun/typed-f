# @typed-f/maybe

[![NPM Version](https://img.shields.io/npm/v/@typed-f/maybe/latest.svg?logo=npm&label=latest&colorB=blue)][maybe-npm] [![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser/master.svg?logo=circleci)](https://circleci.com/gh/Ailrun/typed-f/tree/master) [![Known Vulnerabilities](https://snyk.io/test/github/Ailrun/typed-f/badge.svg?targetFile=packages%2Fmaybe%2Fpackage.json)](https://snyk.io/test/github/Ailrun/typed-f?targetFile=packages%2Fmaybe%2Fpackage.json)

Partial type for [Typed-F](repo-github)

## Installation

```shell
# for NPM>=5
npm install @typed-f/maybe
# or
npm i @typed-f/maybe
# for NPM<5
npm install --save @typed-f/maybe
# or
npm i -S @typed-f/maybe
```

## Description

### APIs

This package includes type definition for `Maybe` type, which is an union type of `Just` and `Nothing`.
This package also includes their methods and some utility functions for them.

#### Types

- `Maybe<T>`
- `Just<T>`
- `Nothing<T>`

#### Methods only for `Maybe`

- `isJust(this: Maybe<T>): this is Just<T>`
    Checks whether `this` is `Just` or not. You can use this with `if` statement like following code.
    ```typescript
    declare const m: Maybe<number>;
    
    if (m.isJust()) {
      // Now `m` is `Just<number>`
      console.log(m.value.toFixed(4));
    }
    ```
- `isNothing(this: Maybe<T>): this is Nothing<any>`
    Counterpart of `isJust`. You can use this with `if` statement.
- `valueOr(this: Maybe<T>, def: T): T`
    If `this` is `Just`, this function returns the inner value of `this`.
    If not, this returns `def` (default value) you passed.
- `valueOrThrow(this: Maybe<T>, err: Error): T`
    If `this` is `Just`, this function returns the inner value of `this`.
    If not, this throws `err` you passed.
- `valueOrCompute(this: Maybe<T>, f: Fun<[], T>): T`
    If `this` is `Just`, this function returns the inner value of `this`.
    If not, this invoke `f` with inner value of current `this`, and return the result.

#### Implemented Typeclasses

- [Monad][monad-github]
    - `bind<U>(this: Maybe<T>, f: Fun<[T], Maybe<U>>): Maybe<U>`
        If `this` is `Just`, applies `f` to its inner value and return the result.
        If `this` is `Nothing`, returns `this`.
- [Applicative][applicative-github]
    - `unit<U>(v: U): Maybe<any, U>`
        Return `Just` of `v`.
    - `ap<U>(this: Maybe<T>, f: Maybe<Fun<[T], U>>): Maybe<U>`
        If `this` is `Just` and `f` is `Just`, applies the inner value of `f` to the inner value of `this` and returns `Just` of the result.
        If `this` is `Just` but `f` is `Nothing`, returns `f`.
        If `this` is `Nothing`, returns `this`.
- [Functor][functor-github]
    - `map<U>(this: Maybe<T>, f: Fun<[R], U>): Maybe<U>`
        If `this` is `Just`, applies `f` to the inner value of `this` and returns `Just` of the result.
        If `this` is `Nothing`, returns `this`.
- [Matchable][matchable-github]
    - `matchWith<U>(this: Maybe<T>, cases: MaybePatterns<T, U>): U`
        If `this` is `Just`, applies `cases.just` to the inner value of `this` and returns the result.
        If `this` is `Nothing`, invoke `cases.nothing` and returns the result.
- [Setoid][setoid-github]
    - `equals(other: Maybe<any>): boolean`
        If `this` equals to `other`, return `true`.
        If `this` does not equal to `other`, return `false`.
        When both `this` and `other` are `Just`s and have complex inner values (object), this function tries `equals` method of inner value of `this`. In other words, `this.equals(other) === this.value.equals(other.value)`
    - `notEquals(other: Maybe<any>): boolean`
        Returns `true` if and only if `this.equals(other)` returns `false`.
        
#### Utility Functions

You can use these functions like `Maybe.<function name>`, for example, in case of `map`, you can access it with `Maybe.map`.

- `unit<T>(value: T): Maybe<T>`
    Returns `Just` of `value`.
- `of`
    Alias of `unit`
- `from<T>(value?: null): Nothing<T>`
- `from<T>(value: T): Just<T>`
    Returns `Nothing` for `value` that is `null` or `undefined`, and returns `Just` of `value` for other values.
- `maybe`
    Alias of `from`
- `sequenceObject<O extends object>(obj: { [K in keyof O]: Maybe<O[K]> }): Maybe<O>`
    Takes an `obj` of `Maybe`s and returns an `Maybe` of object.
    If for all keys of `obj`, correspoding values are `Just`, then this will return a `Just` of object whose keys are original keys and correspoding values are inner value of original values (`Just`s).
    If for one or more keys of `obj`, values are `Nothing`, then this will return `Nothing`.
- `sequenceArray<T>(array: Maybe<T>[]): Maybe<T[]>`
    Takes an `array` of `Maybe`s and returns an `Maybe` of array.
    If all entries of `array` are `Just`, this will return a `Just` of array whose entries are inner values of original entries. Corresponding entries will have same indices.
    If one or more entries of `array` are `Nothing`, this will return a `Nothing`.
- `map<T, U>(f: Fun<[T], U>): Fun<[Maybe<T>], Maybe<U>>`
    Returns a function that takes `Maybe<T>` and maps its inner value using `f`.
    `map(f)(a)` is same with `a.map(f)`.

[repo-github]: https://github.com/Ailrun/typed-f
[releases-github]: https://github.com/Ailrun/typed-f/releases

[applicative-github]: https://github.com/Ailrun/typed-f/tree/master/packages/applicative
[either-github]: https://github.com/Ailrun/typed-f/tree/master/packages/either
[function-github]: https://github.com/Ailrun/typed-f/tree/master/packages/function
[functor-github]: https://github.com/Ailrun/typed-f/tree/master/packages/functor
[lens-github]: https://github.com/Ailrun/typed-f/tree/master/packages/lens
[matchable-github]: https://github.com/Ailrun/typed-f/tree/master/packages/matchable
[maybe-github]: https://github.com/Ailrun/typed-f/tree/master/packages/maybe
[monad-github]: https://github.com/Ailrun/typed-f/tree/master/packages/monad
[setoid-github]: https://github.com/Ailrun/typed-f/tree/master/packages/setoid
[tagged-github]: https://github.com/Ailrun/typed-f/tree/master/packages/tagged

[applicative-npm]: https://www.npmjs.com/package/@typed-f/applicative
[either-npm]: https://www.npmjs.com/package/@typed-f/either
[function-npm]: https://www.npmjs.com/package/@typed-f/function
[functor-npm]: https://www.npmjs.com/package/@typed-f/functor
[lens-npm]: https://www.npmjs.com/package/@typed-f/lens
[matchable-npm]: https://www.npmjs.com/package/@typed-f/matchable
[maybe-npm]: https://www.npmjs.com/package/@typed-f/maybe
[monad-npm]: https://www.npmjs.com/package/@typed-f/monad
[setoid-npm]: https://www.npmjs.com/package/@typed-f/setoid
[tagged-npm]: https://www.npmjs.com/package/@typed-f/tagged
