import { BrowserModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing.module';
import { CoreModule } from './core/core.module';
import { MainLayoutComponent } from './components/layouts/main.component';
import { SingleLayoutComponent } from './components/layouts/single.component';
import { SHARED_COMPONENTS } from './core/shared.components';
import { CoreProviders } from './core/core.providers';

@NgModule({
   declarations: [AppComponent,
      SingleLayoutComponent,
      MainLayoutComponent],
   imports: [
      BrowserModule.withServerTransition({ appId: 'cricketServer' }),
      TransferHttpCacheModule,
      AppRoutingModule,
      ...SHARED_COMPONENTS,
      // if using modules:
      CoreModule,
   ],
   // if using standalone
   // providers: [
   //    ...CoreProviders
   // ]
})
export class AppModule { }
