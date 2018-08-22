# Why Do We Need `Either` (Disjoint/Tagged Union Type)?

## Union Type in TS

In TS, you already have [union type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#union-types) (not *disjoint union type*) like following.

```typescript
// Suppose that there is some awesome interface for `Food`.
interface Food {}

interface Fish {
  swim(): void;
  eat(food: Food): void;
}

interface Cow {
  moo(): void;
  eat(food: Food): void;
}

type Animal = Fish | Cow;
```

and this is quite useful to describe a function, that could return a value of an interface among a list of interfaces. For example, above `Animal` type is useful to describe a function that could return `Fish` or `Cow`.

## Type Assertion

However, you cannot access `swim` and `moo` from the variable of `Animal` type. To access them, you need to use somekind of [type assertions](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-type-assertions) like this.

``` typescript
declare const animal: Animal;

if ((animal as Fish).swim) {
  (animal as Fish).swim();
} else {
  (animal as Cow).moo();
}
```

However, you can make mistake while refactor this since you repeat your self in type assertions, and even worse, one can break typesafety like following.

``` typescript
declare const animal: Animal;

if ((animal as Fish).swim) {
  (animal as Fish).swim();
} else {
  /**
   * `animal` should be of `Cow` type in block, but one used `Fish` by mistake.
   * This code will make runtime error.
   */
  (animal as Fish).swim();
}
```

## Type Guards

You can handle this more elegant way, i.e., using [type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards).

``` typescript
function isFish(animal: Animal): animal is Fish {
  return (animal as Fish).swim !== undefined;
}

declare const animal: Animal;

if (isFish(animal)) {
  animal.swim();
} else {
  animal.moo();
}
```

However, this is still vulnerable to modification. Suppose that you add `swim` method to `Cow`.

``` typescript
interface Cow {
  // They swim for food! (or not :) )
  swim(food: Food): void;
  moo(): void;
  eat(food: Food): void;
}

type Animal = Fish | Cow;
```

Now, following same code, is not considered equally in compile time and run time.

``` typescript
declare const animal: Animal;

if (isFish(animal)) {
  /**
   * One expect `animal` is of `Fish` type and type-checking will succeed,
   * but in runtime, `animal` can be of `Fish` or of `Cow`.
   * `swim` method of `Cow` requires an argument, so it leads this code to unexpected behaviour.
   */
  animal.swim();
}
```

## Disjoint Union Type (Tagged Union Type)

To handle such caveat, we introduce disjoint union type.

``` typescript
interface Fish {
  kind: 'Fish';
  swim(): void;
  eat(food: Food): void;
}

interface Cow {
  kind: 'Cow';
  swim(food: Food): void;
  moo(): void;
  eat(food: Food): void;
}

type Animal = Fish | Cow;

declare const animal: Animal;

if (animal.kind === 'Fish') {
  animal.swim();
}
```

Now, you don't need to (of course you can) define additional `isFish` function, and there's no (or strictly, much less) false positive in `Fish` type guard. But you need to manage your own `kind`s, and you cannot union types with same `kind`.

## Either

That's where `Either` helps you. `Either<L, R>` provides one more wrapper for `L` and `R`, so you can union types with same (or similar) structure, and it already have its own `kind`s (`Right` and `Left`), and manage them with many utility functions.

You can write `Fish` and `Cow` example with `Either` like following.

``` typescript
interface Fish {
  swim(): void;
  eat(food: Food): void;
}

interface Cow {
  swim(food: Food): void;
  moo(): void;
  eat(food: Food): void;
}

type Animal = Either<Fish, Cow>;

declare const animal: Animal;
declare const food: Food;

if (animal.isLeft()) {
  animal.swim();
} else {
  animal.swim(food);
}
```

You don't need to implement your type guard, you don't need to manage your own `kind`s, .... What you need to do is focusing on what you want to describe.

That's why we need `Either`.

## Furthermore

See [`Maybe`](maybe-github) when you need to describe `SomeType | undefined` elegantly.

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
