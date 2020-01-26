import { NgModule, APP_INITIALIZER } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CricketInterceptor } from './http';

import {
    // inject:services
    // endinject
} from './services';
import { Config } from '../config';
import { UploadModule } from '../lib/upload';
import { LocalInterceptor } from './local.interceptor';



// services singletons here
@NgModule({
    imports: [CommonModule, HttpClientModule, UploadModule.forRoot({
        defaultUploadSize: Config.Basic.defaultUploadSize,
        defaultUploadFormat: Config.Basic.defaultUploadFormat
    })],
    providers: [Title,
       
        {
            provide: APP_INITIALIZER,
            useFactory: ConfigService.configFactory,
            multi: true,
            deps: [ConfigService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LocalInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CricketInterceptor,
            multi: true,
        }]
})
export class CoreModule {

}
