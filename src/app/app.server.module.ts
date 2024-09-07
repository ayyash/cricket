import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
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

