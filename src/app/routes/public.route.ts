import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicHomeComponent } from '../components/public/home.component';



const routes: Routes = [
    {
        path: '',
        component: PublicHomeComponent,
        title: 'SITE_NAME'
    }
    // **gulproute**
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        PublicHomeComponent
        // **gulpcomponent**
    ]
})
export class PublicRoutingModule { }

