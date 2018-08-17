/*
 * Copyright 2018-present Junyoung Clare Jang
 */
export type Fun<A extends any[] = any[], R = any> = (...args: A) => R;
