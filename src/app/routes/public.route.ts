import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { PublicHomeComponent } from '../core/components';


const routes: Routes = [
    {
        path: ''
    }
     // **gulproute**
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
         // **gulpcomponent**
    ]
})
export class PublicModule { }
