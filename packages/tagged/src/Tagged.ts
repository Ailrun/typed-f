export interface Tag1List<_A0> {}
export interface Tag2List<_A0, _A1> {}
export interface Tag3List<_A0, _A1, _A2> {}
export interface Tag4List<_A0, _A1, _A2, _A3> {}

export type Tags =
  | keyof Tag1List<any>
  | keyof Tag2List<any, any>
  | keyof Tag3List<any, any, any>
  | keyof Tag4List<any, any, any, any>
  ;

export interface Tagged<Tag extends Tags> {
  __typed_f__tag__: Tag;
}
