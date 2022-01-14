import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { PublicHomeComponent } from '../components/public/home.component';



const routes: Routes = [
    {
        path: '',
        component: PublicHomeComponent,
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
        PublicHomeComponent
        // **gulpcomponent**
    ]
})
export class PublicRoutingModule { }

