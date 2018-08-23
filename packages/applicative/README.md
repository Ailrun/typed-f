# @typed-f/applicative

[![NPM Version](https://img.shields.io/npm/v/@typed-f/applicative/latest.svg?logo=npm&label=latest&colorB=blue)][applicative-npm] [![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser/master.svg?logo=circleci)](https://circleci.com/gh/Ailrun/typed-f/tree/master) [![Known Vulnerabilities](https://snyk.io/test/github/Ailrun/typed-f/badge.svg?targetFile=packages%2Fapplicative%2Fpackage.json)](https://snyk.io/test/github/Ailrun/typed-f?targetFile=packages%2Fapplicative%2Fpackage.json)

Applicative implementation for [Typed-F][repo-github]

## Installation

End user could install this as a dev dependency like

``` shell
npm install --save-dev @typed-f/applicative
# or
npm i -D @typed-f/applicative
```

TS library authors should install this as a dependency (not a dev dependency)

```shell
# for NPM>=5
npm install @typed-f/applicative
# or
npm i @typed-f/applicative
# for NPM<5
npm install --save @typed-f/applicative
# or
npm i -S @typed-f/applicative
```

## Description

This package includes type definition for `applicative` type class, which includes

- `unit<T>(value: T): Applicative<T>`
- `of: typeof unit`
- `ap<T, U>(this: Applicative<T>, wf: Applicative<Fun<[T], U>>): Applicative<U>`

(Above type definitions are not accurate one. In here, accurate types are modified for easier understanding.)

For example applicative, see [@typed-f/maybe][maybe-github]

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
