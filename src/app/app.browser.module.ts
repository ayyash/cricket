import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// optional if you are using @angular/animations add this to browser module
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppModule } from './app.module';

@NgModule({
    imports: [
        // BrowserAnimationsModule,
        AppModule,
    ],
    bootstrap: [AppComponent]
})
export class AppBrowserModule {}
