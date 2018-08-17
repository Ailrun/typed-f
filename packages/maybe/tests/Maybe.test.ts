import { Just, Maybe, Nothing } from '@typed-f/maybe/dist/Maybe';

describe('Maybe', () => {
  describe('static', () => {
    describe('from', () => {
      const from = Maybe.from;

      it('should return Just when the value is not undefined nor null', () => {
        expect(from(5) instanceof Just).toBe(true);
        expect(from('abc') instanceof Just).toBe(true);
        expect(from([]) instanceof Just).toBe(true);
        expect(from({ x: 42 }) instanceof Just).toBe(true);
      });

      it('should return Nothing when the value is not passed, is undefined, or is null', () => {
        expect(from() instanceof Nothing).toBe(true);
        expect(from(undefined) instanceof Nothing).toBe(true);
        expect(from(null) instanceof Nothing).toBe(true);
      });
    });

    describe('of', () => {
      const of = Maybe.of;

      it('should return Just for any values', () => {
        expect(of(undefined) instanceof Just).toBe(true);
        expect(of(null) instanceof Just).toBe(true);
        expect(of(34) instanceof Just).toBe(true);
        expect(of('421@!') instanceof Just).toBe(true);
        expect(of(/.*/) instanceof Just).toBe(true);
      });
    });

    describe('sequenceObject', () => {
      const sequenceObject = Maybe.sequenceObject;

      it('should return a Just of object when input is an object of Justs', () => {
        expect(sequenceObject({
          x: new Just(4),
        })).toEqual(new Just({
          x: 4,
        }));

        expect(sequenceObject({
          key: new Just('abc'),
        })).toEqual(new Just({
          key: 'abc',
        }));

        expect(sequenceObject({
          value1: new Just(undefined),
          value2: new Just(true),
        })).toEqual(new Just({
          value1: undefined,
          value2: true,
        }));
      });

      it('should return a Nothing when input is an object with more than one Nothings', () => {
        expect(sequenceObject({
          kind: new Just('string'),
          value: new Nothing(),
        })).toEqual(new Nothing());

        expect(sequenceObject({
          kind: new Just('string'),
          value: new Nothing(),
          size: new Just(4),
        })).toEqual(new Nothing());

        expect(sequenceObject({
          obj: new Just({ a: 'num' }),
          access: new Nothing(),
          permission: new Nothing(),
        })).toEqual(new Nothing());
      });
    });

    describe('sequenceArray', () => {
      const sequenceArray = Maybe.sequenceArray;

      it('should return a Just of array when input is an array of Justs', () => {
        expect(sequenceArray([
          new Just(1),
          new Just(2),
          new Just(3),
        ])).toEqual(new Just([
          1,
          2,
          3,
        ]));

        expect(sequenceArray<string | boolean | { x: number }>([
          new Just('a'),
          new Just(true),
          new Just({ x: 4 }),
        ])).toEqual(new Just([
          'a',
          true,
          { x: 4 },
        ]));
      });

      it('should return a Nothing when input includes more than one Nothings', () => {
        expect(sequenceArray<string | number>([
          new Just('4'),
          new Just(5),
          new Nothing(),
        ])).toEqual(new Nothing());

        expect(sequenceArray<string | RegExp>([
          new Nothing(),
          new Just('abed'),
          new Just(/.*/),
        ])).toEqual(new Nothing());
      });
    });

    describe('map', () => {
      const map = Maybe.map;

      it('should map internal value of second input with first input', () => {
        expect(map((x: number) => x + 1)(new Just(4))).toEqual(new Just(5));

        expect(map((x: number) => x.toString())(new Just(4))).toEqual(new Just('4'));

        expect(map((x: { doesWork: boolean }) => x.doesWork ? 'Work!' : 'Sad...')(new Just({
          doesWork: true,
        }))).toEqual(new Just('Work!'));
      });

      it('should map nothing to nothing', () => {
        expect(map((x: number) => x + 1)(new Nothing())).toEqual(new Nothing());

        expect(map((str: string) => str.toUpperCase())(new Nothing())).toEqual(new Nothing());
      });
    });
  });
});
