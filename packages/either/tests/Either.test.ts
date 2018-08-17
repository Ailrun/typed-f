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
        expect(sequenceObject({
          x: new Right(5),
          y: new Right(4),
          z: new Right(3),
        })).toEqual(new Right({
          x: 5,
          y: 4,
          z: 3,
        }));

        expect(sequenceObject({
          name: new Right('Junyoung Clare Jang'),
          footSize: new Right(4000),
          address: new Right('Somewhere near heaven'),
        })).toEqual(new Right({
          name: 'Junyoung Clare Jang',
          footSize: 4000,
          address: 'Somewhere near heaven',
        }));
      });

      it('should return a Left of first error when input includes more than one Lefts', () => {
        expect(sequenceObject<string, { world: string, mine: any }>({
          world: new Right('is'),
          mine: new Left('sing'),
        })).toEqual(new Left('sing'));
      });
    });

    describe('sequenceArray', () => {
      const sequenceArray = Either.sequenceArray;

      it('should return a Right of array when input is an array of Rights', () => {
        expect(sequenceArray<any, number | string>([
          new Right(1),
          new Right(2),
          new Right('a'),
        ])).toEqual(new Right([
          1,
          2,
          'a',
        ]));

        expect(sequenceArray<any, { x: number } | RegExp>([
          new Right({ x: 4 }),
          new Right(/ab*/),
        ])).toEqual(new Right([
          { x: 4 },
          /ab*/,
        ]));
      });

      it('should ', () => {
        
      });
    });
  });
});
