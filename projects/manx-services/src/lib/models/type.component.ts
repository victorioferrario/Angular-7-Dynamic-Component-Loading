import { Type } from '@angular/core';
export class TypeComponent<T> {
  constructor(public component: Type<any>, public data: T) {}
}
