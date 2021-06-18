import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared.module';
import { Routes, RouterModule } from '@angular/router';
import * as CoreComponents from '../core/components';



const routes: Routes = [
    {
        path: '',
        component: CoreComponents.PublicHomeComponent,
        data: {
            title: 'SITE_NAME'
        }
    }
    // **gulproute**
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        CoreComponents.PublicHomeComponent
        // **gulpcomponent**
    ]
})
export class PublicRoutingModule { }

