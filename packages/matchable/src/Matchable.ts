import { Fun } from '@typed-f/function';

export interface MatchPatterns<U> {
  [key: string]: Fun<any[], U>;
}

export interface Matchable {
  /**
   * @desc
   * `Matchable` methods
   */

  matchWith<U>(patterns: MatchPatterns<U>): U;
  /**
   * @desc
   * alias of `matchWith`
   */
  caseOf<U>(patterns: MatchPatterns<U>): U;
}
