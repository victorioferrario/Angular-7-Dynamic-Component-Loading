import {
  Injectable,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';
import { TypeComponent } from './models/type.component';
@Injectable()
export class AppContextInjector {
  public hostRef: ViewContainerRef;
  constructor(private factory: ComponentFactoryResolver) {}
  public loadComponent<T>(host: ViewContainerRef, item: TypeComponent<T>) {
    if (host !== undefined) {
      host.clear();
      const componentRef = host.createComponent(
        this.factory.resolveComponentFactory(item.component)
      );
      (<TypeComponent<T>>componentRef.instance).data = item.data;
    }
  }
}
