import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CricketInterceptor } from './http';

import {
    // inject:services

    // endinject
} from './services';


// services singletons here
@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [Title,
        // inject:services

        // endinject,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CricketInterceptor,
            multi: true,
        }]
})
export class CoreModule {

}
