# @typed-f/either

[![NPM Version](https://img.shields.io/npm/v/@typed-f/either/latest.svg?logo=npm&label=latest&colorB=blue)][either-npm] [![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser/master.svg?logo=circleci)](https://circleci.com/gh/Ailrun/typed-f/tree/master) [![Known Vulnerabilities](https://snyk.io/test/github/Ailrun/typed-f/badge.svg?targetFile=packages%2Feither%2Fpackage.json)](https://snyk.io/test/github/Ailrun/typed-f?targetFile=packages%2Feither%2Fpackage.json)

Disjoint union type for [Typed-F](repo-github)

## Installation

```shell
# for NPM>=5
npm install @typed-f/either
# or
npm i @typed-f/either
# for NPM<5
npm install --save @typed-f/either
# or
npm i -S @typed-f/either
```

## Description

### Why do we need `Either` (Disjoint union type)?

See [this document](https://github.com/Ailrun/typed-f/tree/master/docs/why-do-we-need-either.md).

### APIs

This package includes type definition for `Either` type, which is an union type of `Right` and `Left`.
This package also includes their methods and some utility functions for them.

#### Types

- `Either<L, R>`
- `Right<L, R>`
- `Left<L, R>`

#### Methods only for `Either`

- `isLeft(this: Either<L, R>): this is Left<L, R>`  
    Checks whether `this` is `Left` or not. You can use this with `if` statement like following.
    ```typescript
    declare const e: Either<string, number>;
    
    if (e.isLeft()) {
      // Now `e` is `Left<string, number>`
      e.value.slice(0, 1);
    }
    ```
- `isRight(this: Either<L, R>): this is Right<L, R>`  
    Counterpart of `isLeft`. You can use this with `if` statement too.
- `leftOr(this: Either<L, R>, def: L): L`  
    If `this` is `Left`, this function returns the inner value of `this`.
    If not, this returns `def` (default value) you passed.
- `leftOrThrow(this: Either<L, R>, err: Error): L`  
    If `this` is `Left`, this function returns the inner value of `this`.
    If not, this throws `err` you passed.
- `leftOrCompute(this: Either<L, R>, f: Fun<[R], L>): L`  
    If `this` is `Left`, this function returns the inner value of `this`.
    If not, this invoke `f` with inner value of current `this`, and return the result.
- `rightOr(this: Either<L, R>, def: R): R`  
    Counterpart of `leftOr`
- `rightOrThrow(this: Either<L, R>, err: Error): R`  
    Counterpart of `leftOrThrow`
- `rightOrCompute(this: Either<L, R>, f: Fun<[L], R>): R`  
    Counterpart of `leftOrCompute`

#### Implemented Typeclasses

Most of typeclass implementation of `Either` considers `Right` as a valid value container, and `Left` as an error value container.

- [Monad][monad-github]
    - `bind<U>(this: Either<L, R>, f: Fun<[R], Either<L, U>>): Either<L, U>`
        If `this` is `Right`, applies `f` to its inner value and return the result.
        If `this` is `Left`, returns `this`.
- [Applicative][applicative-github]
    - `unit<U>(v: U): Either<any, U>`
        Return `Right` of `v`.
    - `ap<U>(this: Either<L, R>, f: Either<L, Fun<[R], U>>): Either<L, U>`
        If `this` is `Right` and `f` is `Right`, applies the inner value of `f` to the inner value of `this` and returns `Right` of the result.
        If `this` is `Right` but `f` is `Left`, returns `f`.
        If `this` is `Left`, returns `this`.
- [Functor][functor-github]
    - `map<U>(this: Either<L, R>, f: Fun<[R], U>): Either<L, U>`
        If `this` is `Right`, applies `f` to the inner value of `this` and returns `Right` of the result.
        If `this` is `Left`, returns `this`.
- [Matchable][matchable-github]
    - `matchWith<U>(this: Either<L, R>, cases: EitherPatterns<L, R, U>): U`
        If `this` is `Right`, applies `cases.right` to the inner value of `this` and returns the result.
        If `this` is `Left`, applies `cases.left` to the inner value of `this` and returns the result.
- [Setoid][setoid-github]
    - `equals(other: Either<any, any>): boolean`
        If `this` equals to `other`, return `true`.
        If `this` does not equal to `other`, return `false`.
        When both `this` and `other` have complex inner values (object), this function tries `equals` method of inner value of `this`. In other words, `this.equals(other) === this.value.equals(other.value)`
    - `notEquals(other: Either<any, any>): boolean`
        Returns `true` if and only if `this.equals(other)` returns `false`.
        
#### Utility Functions

You can use these functions like `Either.<function name>`, for example, in case of `map`, you can access it with `Either.map`.

- `unit<R>(value: R): Either<any, R>`
    Returns `Right` of `value`.
- `of`
    Alias of `unit`
- `sequenceObject<L, O extends object>(obj: { [K in keyof O]: Either<L, O[K]> }): Either<L, O>`
    Takes an `obj` of `Either`s and returns an `Either` of object.
    If for all keys of `obj`, correspoding values are `Right`, then this will return a `Right` of object whose keys are original keys and correspoding values are inner value of original values (`Right`s).
    If for one or more keys of `obj`, values are `Left`, then this will return first encounted `Left` value.
    (Be careful, if there are more than one `Left` values in `obj`, returned value can be changed by JS engine codes run with)
- `sequenceArray<L, R>(array: Either<L, R>[]): Either<L, R[]>`
    Takes an `array` of `Either`s and returns an `Either` of array.
    If all entries of `array` are `Right`, this will return a `Right` of array whose entries are inner values of original entries. Corresponding entries will have same indices.
    If one or more entries of `array` are `Left`, this will return a leftmost `Left` entry (whose index is minimum).
- `map<L, R, U>(f: Fun<[R], U>): Fun<[Either<L, R>], Either<L, U>>`
    Returns a function that takes `Either<L, R>` and maps its right inner value using `f`.
    `map(f)(a)` is same with `a.map(f)`.

[repo-github]: https://github.com/Ailrun/typed-f
[releases-github]: https://github.com/Ailrun/typed-f/releases

[applicative-github]: https://github.com/Ailrun/typed-f/tree/master/packages/applicative
[either-github]: https://github.com/Ailrun/typed-f/tree/master/packages/either
[function-github]: https://github.com/Ailrun/typed-f/tree/master/packages/function
[functor-github]: https://github.com/Ailrun/typed-f/tree/master/packages/functor
[matchable-github]: https://github.com/Ailrun/typed-f/tree/master/packages/matchable
[maybe-github]: https://github.com/Ailrun/typed-f/tree/master/packages/maybe
[monad-github]: https://github.com/Ailrun/typed-f/tree/master/packages/monad
[setoid-github]: https://github.com/Ailrun/typed-f/tree/master/packages/setoid
[tagged-github]: https://github.com/Ailrun/typed-f/tree/master/packages/tagged

[applicative-npm]: https://www.npmjs.com/package/@typed-f/applicative
[either-npm]: https://www.npmjs.com/package/@typed-f/either
[function-npm]: https://www.npmjs.com/package/@typed-f/function
[functor-npm]: https://www.npmjs.com/package/@typed-f/functor
[matchable-npm]: https://www.npmjs.com/package/@typed-f/matchable
[maybe-npm]: https://www.npmjs.com/package/@typed-f/maybe
[monad-npm]: https://www.npmjs.com/package/@typed-f/monad
[setoid-npm]: https://www.npmjs.com/package/@typed-f/setoid
[tagged-npm]: https://www.npmjs.com/package/@typed-f/tagged
