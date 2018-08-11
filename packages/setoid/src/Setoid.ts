export interface Setoid<_T> {
  /**
   * @desc
   * `Setoid` methods
   */

  equals<U>(other: Setoid<U>): boolean;

  notEquals<U>(other: Setoid<U>): boolean;
}
