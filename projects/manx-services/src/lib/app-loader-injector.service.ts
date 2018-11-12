import { TypeComponent } from './models/type.component';
import {
  Injectable,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild
} from '@angular/core';
import { TypeNoDataComponent } from './models/type-nodata.component';
@Injectable()
export class AppContextLoaderInjector {
  protected loadContainer: ViewContainerRef;
  constructor(private factory: ComponentFactoryResolver) {}
  public createLoader(container: ViewContainerRef, item: TypeNoDataComponent) {
    const self = this;
    self.loadContainer = container;
    self.generateDynamicComponent(item);
  }
  public removeLoader() {
    const self = this;
    self.loadContainer.remove(0);
  }
  protected generateDynamicComponent(item: any) {
    this.loadContainer.createComponent(
      this.factory.resolveComponentFactory(item.component)
    );
  }
}
