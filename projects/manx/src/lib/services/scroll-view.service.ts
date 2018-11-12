import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDataItem } from '../models/IDataItem';
import { dataItems } from './scroll-data';
import { AppContextInjector } from '@manx-services';
@Injectable()
export class ScrollViewContext {
  public items: IDataItem[];
  public count: number;
  //
  public height: BehaviorSubject<number>;
  public width: BehaviorSubject<string>;
  public index: BehaviorSubject<number>;
  //
  public hasNext: BehaviorSubject<boolean>;
  public hasPrev: BehaviorSubject<boolean>;
  public dispatch: EventEmitter<boolean>;
  constructor(public appInjector: AppContextInjector) {
    const self = this;
    self.items = dataItems;
    self.count = dataItems.length;
    //
    self.height = new BehaviorSubject<number>(500);
    self.height.asObservable();
    //
    self.width = new BehaviorSubject<string>('100%');
    self.width.asObservable();
    //
    self.index = new BehaviorSubject<number>(0);
    self.index.asObservable();
    //
    self.hasNext = new BehaviorSubject<boolean>(true);
    self.hasNext.asObservable();
    //
    self.hasPrev = new BehaviorSubject<boolean>(false);
    self.hasPrev.asObservable();
    //
    self.dispatch = new EventEmitter<boolean>();
    //
    self.createChildServices();
  }
  protected createChildServices() {
    const self = this;
    self.dispatch.emit(true);
  }
  public next() {
    const self = this;
    if (self.hasNext.value) {
      self.hasPrev.next(true);
      self.index.next(self.index.value + 1);
      self.update();
      self.hasNext.next(self.index.value !== self.count - 1);
    }
  }
  public prev() {
    const self = this;
    if (self.hasPrev.value) {
      self.hasNext.next(true);
      self.index.next(self.index.value - 1);
      self.update();
      self.hasPrev.next(self.index.value !== 0);
    }
  }
  protected update() {
    const self = this;
    self.height.next(self.items[self.index.value].height);
  }
}
