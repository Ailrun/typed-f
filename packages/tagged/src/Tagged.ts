export interface Tag1List<_T> {
}

export interface Tag2List<_T, _U> {
}

export interface Tag3List<_T, _U, _V> {
}

export interface Tag4List<_T, _U, _V, _W> {
}

export type Tags<T> =
  | keyof Tag1List<T>
  | keyof Tag2List<T, any>
  | keyof Tag3List<T, any, any>
  | keyof Tag4List<T, any, any, any>
  ;

export interface Tagged<Tag extends Tags<any>> {
  __typed_f__tag__: Tag;
}
