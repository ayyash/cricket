import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './components/common/shared.module';
import {
    MainLayoutComponent,
    SingleLayoutComponent,
    NotFoundComponent,
  } from './core/components';
  
@NgModule({
  declarations: [
    AppComponent, MainLayoutComponent,
    NotFoundComponent,
    SingleLayoutComponent
  ],
  imports: [
    BrowserModule, SharedModule, AppRoutingModule, CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
