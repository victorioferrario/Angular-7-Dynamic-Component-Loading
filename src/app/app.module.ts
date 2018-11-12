import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ManxModule, MaterialModule } from '@manx';
import { AppContextInjector } from '@manx-services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app';
import { MainComponent, ShellComponent, HeaderComponent } from './components';

export const LOCAL_COMPONENTS = [
  AppComponent,
  MainComponent,
  HeaderComponent,
  ShellComponent
];
@NgModule({
  declarations: [LOCAL_COMPONENTS],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ManxModule
  ],
  providers: [AppContextInjector],
  bootstrap: [LOCAL_COMPONENTS[0]]
})
export class AppModule {}
