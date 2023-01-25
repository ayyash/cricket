import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicHomeComponent } from '../components/public/home.component';
import { ResPipe } from '../lib/pipes/res.pipe';
import { TranslatePipe } from '../lib/pipes/translate.pipe';



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
        RouterModule.forChild(routes),
        TranslatePipe,
        ResPipe
    ],
    declarations: [
        PublicHomeComponent
        // **gulpcomponent**
    ]
})
export class PublicRoutingModule { }

