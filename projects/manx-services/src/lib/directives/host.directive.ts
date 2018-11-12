import { Directive, ViewContainerRef } from '@angular/core';
import { AppContextInjector } from '../app-injector.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[img-host]'
})
export class HostDirective {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private context: AppContextInjector
  ) {
    context.hostRef = viewContainerRef;
  }
}
