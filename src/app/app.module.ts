import { BrowserModule } from '@angular/platform-browser';
import {TransferHttpCacheModule} from '@nguniversal/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './core/shared.module';
import { MainLayoutComponent, SingleLayoutComponent, NotFoundComponent, ErrorComponent, PublicHomeComponent, RerouteComponent } from './core/components';

@NgModule({
    declarations: [AppComponent,
        MainLayoutComponent,
        NotFoundComponent,
        RerouteComponent,
        SingleLayoutComponent,
        PublicHomeComponent,
         ErrorComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'cricketS' }),
        TransferHttpCacheModule,
        SharedModule,
        AppRoutingModule,
        CoreModule
    ]
})
export class AppModule {}
