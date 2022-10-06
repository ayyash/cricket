import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';
// optionally if you are using @angular/anumations, import NoopAnimationsModule into server
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// replace leaflet with something else

@NgModule({
  imports: [
    // NoopAnimationsModule,
    AppModule,
    ServerModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}

