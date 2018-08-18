import { Either, Left, Right } from '@typed-f/either';

describe('Either', () => {
  describe('static', () => {
    describe('of', () => {
      const of = Either.of;

      it('should return Right for any values', () => {
        expect(of(undefined) instanceof Right).toBe(true);
        expect(of(null) instanceof Right).toBe(true);
        expect(of(5) instanceof Right).toBe(true);
        expect(of('abc') instanceof Right).toBe(true);
      });
    });

    describe('sequenceObject', () => {
      const sequenceObject = Either.sequenceObject;

      it('should return a Right of object when input is an object of Rights', () => {
        expect(sequenceObject<any, { x: number; y: number; z: number }>({
          x: new Right(5),
          y: new Right(4),
          z: new Right(3),
        })).toEqual(new Right<any, { x: number; y: number; z: number }>({
          x: 5,
          y: 4,
          z: 3,
        }));

        expect(sequenceObject<any, { name: string; footSize: number; address: string }>({
          name: new Right('Junyoung Clare Jang'),
          footSize: new Right(4000),
          address: new Right('Somewhere near heaven'),
        })).toEqual(new Right<any, { name: string; footSize: number; address: string }>({
          name: 'Junyoung Clare Jang',
          footSize: 4000,
          address: 'Somewhere near heaven',
        }));
      });

      it('should return a Left of first Left when input includes more than one Lefts', () => {
        expect(sequenceObject({
          world: new Right<string, string>('is'),
          mine: new Left<string, any>('sing'),
        })).toEqual(new Left<string, any>('sing'));
      });
    });

    describe('sequenceArray', () => {
      const sequenceArray = Either.sequenceArray;

      it('should return a Right of array when input is an array of Rights', () => {
        expect(sequenceArray<any, number | string>([
          new Right(1),
          new Right(2),
          new Right('a'),
        ])).toEqual(new Right<any, (number | string)[]>([
          1,
          2,
          'a',
        ]));

        expect(sequenceArray<any, { x: number } | RegExp>([
          new Right({ x: 4 }),
          new Right(/ab*/),
        ])).toEqual(new Right<any, ({ x: number } | RegExp)[]>([
          { x: 4 },
          /ab*/,
        ]));
      });

      it('should return a Left of first Left when input includes more than one Lefts', () => {
        expect(sequenceArray<string, number>([
          new Right(4),
          new Right(54),
          new Left('Too small'),
          new Right(1),
        ])).toEqual(new Left<string, number>('Too small'));
      });
    });
  });
});
