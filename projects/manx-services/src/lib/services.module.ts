import { HostDirective } from './directives/host.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HostDirective],
  imports: [CommonModule],
  providers: [],
  exports: [HostDirective]
})
export class ServicesModule {}
