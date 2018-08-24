# @typed-f/lens
[![NPM Version](https://img.shields.io/npm/v/@typed-f/lens/latest.svg?logo=npm&label=latest&colorB=blue)][lens-npm] [![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser/master.svg?logo=circleci)](https://circleci.com/gh/Ailrun/typed-f/tree/master) [![Known Vulnerabilities](https://snyk.io/test/github/Ailrun/typed-f/badge.svg?targetFile=packages%2Flens%2Fpackage.json)](https://snyk.io/test/github/Ailrun/typed-f?targetFile=packages%2Flens%2Fpackage.json)

Lens for [Typed-F][repo-github]

## Installation
```shell
# for NPM>=5
npm install @typed-f/lens
# or
npm i @typed-f/lens
# for NPM<5
npm install --save @typed-f/lens
# or
npm i -S @typed-f/lens
```

## Usage Example
Suppose that you have complex object, and want to update part of it, immutably. For example, you want to update `oldObject.user.books[0].price` to `22` in following code, without mutable modification of the object.

``` typescript
const oldObject = {
  info: 4,
  user: {
    id: 4,
    books: [
      {
        id: 23,
        title: 'First Book',
        publisher: {
          id: 123,
          name: 'Some Pub',
        },
        price: 20,
      },
      {
        id: 43,
        title: 'Other Book',
        publisher: {
          id: 154,
          name: 'Pub Beer',
        },
        price: 32,
      },
    ],
  },
};
```

You would do something like this.

``` typescript
const newObject = {
  ...oldObject,
  user: {
    ...oldObject.user,
    books: [
      {
        ...oldObject.user.books[0],
        price: 22,
      },
      oldObject.user.books[1],
    ],
  },
};
```

What really important is just `price: 22` part, but you need many boilerplates to do that. With Lens, you can achieve this with following code.

``` typescript
const objectLens = new LensGenerator<typeof oldObject>().fromKeys();
const newObject = objectLens
  .focusTo('user')
  .focusTo('books')
  .focusTo(0)
  .focusTo('price')
  .set()(oldObject)(22);
```

You can write even nicer (well, actually it's matter of taste :) ) syntax with ES6 [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) (Be careful about [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#Browser_compatibility)! You may consider using [this polyfill](https://github.com/GoogleChrome/proxy-polyfill#usage).)

``` typescript
const objectLens = new LensGenerator<typeof oldObject>().byProxy();
const newObject = objectLens
  .user
  .books[0]
  .price
  .set()(oldObject)(22);
```

I added some linefeeds to be visually pleasing. However, of course, you can write those accesses in a line.

``` typescript
const objectLens = new LensGenerator<typeof oldObject>().byProxy();
const newObject = objectLens.user.books[0].price.set()(oldObject)(22);
```

## APIs
This package includes following classes

- [`Lens`](#constructor-of-lens)
- [`LensS`](#constructor-of-lenss) (Simple Lens)
- [`LensGenerator`](#constructor-of-lensgenerator)

`Lens` and `LensS` (specially `Lens`) just include some boring APIs, and really useful utilities come from `LensGenerator`.

### Methods of `Lens`

#### Constructor of `Lens`
```typescript
constructor(get: Fun<[S], A>, set: Fun<[S], Fun<[B], T>>)
```
Making a lens with getter function and setter function. Those functions will be invoked by `lens.get()` and `lens.set()`.  
Type parameter `A` is type for the part of `S` you want to focus in, and `S` is type for whole state.
`B` is type for modified value for position of `A`, and `T` is type for result whole state of modification.

#### `get`
```typescript
get(this: Lens<A, S, B, T>): Fun<[S], A>
```
Returns getter that `this` lens has. Getter will take initial state (`S`) and return a value focused in (`A`).

#### `set`
```typescript
set(this: Lens<A, S, B, T>): Fun<[S], Fun<[B], T>>
```
Returns setter that `this` lens has. Setter will take initial state (`S`) and new value (`B`), and return a new state (`T`).

#### `map`
```typescript
map(this: Lens<A, S, B, T>): Fun<[S], Fun<[Fun<[A], B>], T>>
```
Returns a mapper (function that gets a value and uses that value to generate new value) for `this` lens.

### Methods of `LensS`
This class inherits `Lens`, so it has all `Lens` APIs. More specifically, `LensS<A, S> extends Lens<A, S, A, S>`.

#### Constructor of `LensS`
```typescript
constructor(get: Fun<[S], A>, set: Fun<[S], Fun<[A], S>>)
```
Same with `Lens` constructor except that this one has fewer type parameters.

#### `makeInner`
```typescript
makeInner<K extends keyof A>(this: LensS<A, S>, key: K): LensS<A[K], A>
```
Returns new Lens that treat `A` as a whole state and `A[K]` as a focused target. For example, when you have some object like
```typescript
interface Manager {
  name: string;
}
interface Library {
  manager: Manager;
}
interface Obj {
  library: Library;
}
const obj: Obj = { library: { manager: { name: 'whoever' } } };
```
and you have a lens `libraryFromObjLens: LensS<Library, Obj>`, calling `libraryFromObjLens.makeInner('manager')` will give you `managerFromLibraryLens: LensS<Manager, Library>`, i.e., a lens to get `manager` from `library` and set `manager` in `library`. For instance,
```typescript
// Getting result will be `{ manager: { name: 'whoever' } }`, i.e., `Library` object.
libraryFromObjLens.get()(obj);
// Setting result will be `{ library: { manager: { name: 'oh-my' } } }`, i.e., `Obj` object.
libraryFromObjLens.set()(obj)({ manager: { name: 'oh-my' } });

// Getting result will be `{ name: 'whoever' }`, i.e., `Manager` object.
managerFromObjLens.get()(obj.library);
// Setting result will be `{ manager: { name: 'pardon?' } }`, i.e., `Library` object.
managerFromObjLens.set()(obj.library)({ name: 'pardon?' });

// Following get will gives a type error.
managerFromObjLens.get()(obj);
// Following set will gives a type error.
managerFromObjLens.set()(obj)({ name: 'pardon?' });
```
If you want to make `LensS<Manager, Obj>`, i.e., a lens to get `library.author` from `obj`, and to modify `library.author` in `obj`, see `focusTo`.

#### `focusTo`
```typescript
focusTo<K extends keyof A>(this: LensS<A, S>, key: K): LensS<A[K], S>
```
Returns new Lens that goes deeper to `A[K]`. For example, when you have some object like

```typescript
interface Manager {
  name: string;
}
interface Library {
  manager: Manager;
}
interface Obj {
  library: Library;
}
declare const obj: Obj;
```

and you have a lens `libraryFromObjLens: LensS<Library, Obj>`, calling `libraryFromObjLens.focusTo('manager')` will give you `managerFromObjLens: LensS<Manager, Obj>`, i.e., a lens to get `manager` from `obj` and set `manager` in `obj`. To make a lens for focusing in `Manager` from `Library`, see `makeInner`.

### Methods of `LensGenerator`
In following type signatures, `S` comes from `LensGenerator` class, i.e., `LensGenerator<S>` is `this`. However, I will not write `this: LensGenerator<S>` in type signatures, since following methods do not use `this`.

#### Constructor of `LensGenerator`
```typescript
constructor()
```
Constructor for `LensGenerator` is only for type parameter. See [this issue](https://github.com/Ailrun/typed-f/issues/30) for discussion about this.

#### `fromKey`
```typescript
fromKey<K extends keyof S>(key: K): LensS<S[K], S>
```

Construct a `LensS` to access `state[key]` and to set the value of `state[key]` in `state: S`.

#### `fromKeys`
```typescript
fromKeys(...keys: []): LensS<S, S>
fromKeys<K0 extends keyof S>(...keys: [K0]): LensS<S[K0], S>
fromKeys<K0 extends keyof S, K1 extends keyof S[K0]>(...keys: [K0, K1]): LensS<S[K0][K1], S>
fromKeys<K0 extends keyof S, K1 extends keyof S[K0], K2 extends keyof S[K0][K1]>(...keys: [K0, K1, K2]): LensS<S[K0][K1][K2], S>
fromKeys<K0 extends keyof S, K1 extends keyof S[K0], K2 extends keyof S[K0][K1], K3 extends keyof S[K0][K1][K2]>(...keys: [K0, K1, K2, K3]): LensS<S[K0][K1][K2][K3], S>
fromKeys<K0 extends keyof S, K1 extends keyof S[K0], K2 extends keyof S[K0][K1], K3 extends keyof S[K0][K1][K2], K4 extends keyof S[K0][K1][K2][K3]>(...keys: [K0, K1, K2, K3, K4]): LensS<S[K0][K1][K2][K3][K4], S>
fromKeys<K0 extends keyof S, K1 extends keyof S[K0], K2 extends keyof S[K0][K1], K3 extends keyof S[K0][K1][K2], K4 extends keyof S[K0][K1][K2][K3], K5 extends keyof S[K0][K1][K2][K3][K4]>(...keys: [K0, K1, K2, K3, K4, K5]): LensS<S[K0][K1][K2][K3][K4][K5], S>
fromKeys<K0 extends keyof S, K1 extends keyof S[K0], K2 extends keyof S[K0][K1], K3 extends keyof S[K0][K1][K2], K4 extends keyof S[K0][K1][K2][K3], K5 extends keyof S[K0][K1][K2][K3][K4], K6 extends keyof S[K0][K1][K2][K3][K4][K5]>(...keys: [K0, K1, K2, K3, K4, K5, K6]): LensS<S[K0][K1][K2][K3][K4][K5][K6], S>
fromKeys<P>(...keys: any[]): LensS<P, S>
```

Construct a `LensS` to access `state[keys[0]][keys[1]]...` and set the value of it in `state: S`.

#### `byProxy`
```typescript
byProxy(): LensSProxy<S, S>
```
*Warning: this API uses ES6 [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Be careful about [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#Browser_compatibility)! You may consider using [this polyfill](https://github.com/GoogleChrome/proxy-polyfill#usage).*

Returns a `Proxy` object that allow you to make lens for any depth of properties. For example, when you have `obj: Obj` (`Obj` type from the example of `makeInner`), you can use
```typescript
const objProxy = new LensGenerator<Obj>().byProxy();
const nameProxy = objProxy
  .library // this can be used as `LensS<Library, Obj>`
  .manager // this can be used as `LensS<Manager, Obj>`
  .name; // this can be used as `LensS<string, Obj>`
// Setting will returns `{ library: { manager: { name: '123' } } }`, i.e., `Obj` object.
nameProxy.set()(obj)('123');
```

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
