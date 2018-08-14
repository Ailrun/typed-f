import * as T from '@typed-f/tagged';

interface SetoidBuilder<Other> {
  equals(other: Other): boolean;

  notEquals(other: Other): boolean;
}

export interface Setoid1<Tag extends keyof T.Tag1List<any>> extends T.Tagged<Tag>, SetoidBuilder<T.Tag1List<any>[Tag]> {}
export interface Setoid2<Tag extends keyof T.Tag2List<any, any>> extends T.Tagged<Tag>, SetoidBuilder<T.Tag2List<any, any>[Tag]> {}
export interface Setoid3<Tag extends keyof T.Tag3List<any, any, any>> extends T.Tagged<Tag>, SetoidBuilder<T.Tag3List<any, any, any>[Tag]> {}
export interface Setoid4<Tag extends keyof T.Tag4List<any, any, any, any>> extends T.Tagged<Tag>, SetoidBuilder<T.Tag4List<any, any, any, any>[Tag]> {}
