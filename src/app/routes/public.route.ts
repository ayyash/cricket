import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared.module';
import { Routes, RouterModule } from '@angular/router';
import * as CoreComponents from '../core/components';


// for non routing module exports, use a different module like this:
@NgModule({
    imports: [SharedModule],
    declarations: [],
    exports: []
})
export class PublicModule {}



// =============================== Routed module
const routes: Routes = [
    {
        path: '',
        // component: CoreComponents.PublicHomeComponent,
        data: {
            title: 'Public homes'
        }
    }
     // **gulproute**
];

@NgModule({
    imports: [
        SharedModule,
        PublicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        // CoreComponents.PublicHomeComponent
         // **gulpcomponent**
    ]
})
export class PublicRoutingModule { }

