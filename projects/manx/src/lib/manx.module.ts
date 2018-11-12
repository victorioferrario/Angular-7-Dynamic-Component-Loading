import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import {
  ScrollViewComponent,
  ScrollItemComponent,
  ScrollNavComponent,
  DynamicImageComponent,
  DynamicLoaderComponent
} from './components';
import { ScrollViewContext } from './services';

export const LOCAL_COMPONENTS = [
  ScrollViewComponent,
  ScrollItemComponent,
  ScrollNavComponent
];
export const LOCAL_DYNAMIC_COMPONENTS = [
  DynamicImageComponent,
  DynamicLoaderComponent
];

@NgModule({
  declarations: [LOCAL_COMPONENTS, LOCAL_DYNAMIC_COMPONENTS],
  imports: [CommonModule, MaterialModule],
  providers: [ScrollViewContext],
  exports: [LOCAL_COMPONENTS, MaterialModule],
  entryComponents: [LOCAL_DYNAMIC_COMPONENTS]
})
export class ManxModule {}
