import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as CoreComponents from './core/components';
import { PreloadService } from './services/preload.service';
import {  RouteReuseService  } from './core/routereuse.service';

const routes: Routes = [
    {
        path: 'error',
        component: CoreComponents.SingleLayoutComponent,
        children: [
            {
                path: '',
                component: CoreComponents.ErrorComponent,
                data: {
                    title: 'ERROR'
                }
            }
        ]
    },
    {
        path: '404',
        component: CoreComponents.SingleLayoutComponent,
        children: [
            {
                path: '',
                component: CoreComponents.NotFoundComponent,
                data: {
                    title: 'NOT_FOUND'
                }
            }
        ]
    },
    // {
    //     path: '',
    //     component: CoreComponents.MainLayoutComponent,
    //     children: [
    //         {
    //             path: '',
    //             component: CoreComponents.PublicHomeComponent,
    //             data: {
    //                 title: 'SITE_NAME'
    //             }
    //         }
    //     ]
    // },
    {
        path: '',
        component: CoreComponents.MainLayoutComponent,
        loadChildren: () => import('./routes/public.route').then(m => m.PublicRoutingModule),
        data: {preload: true, delay: true}

    },

    // **gulproute**
    {
        path: '**',
        redirectTo: '/404', // make 404
        pathMatch: 'full'
    }
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadService,
            reuse
            paramsInheritanceStrategy: 'always',
            onSameUrlNavigation: 'reload',
            scrollPositionRestoration: 'top',
            initialNavigation: 'enabledBlocking'
        })
    ],
    exports: [RouterModule],
    providers: [{provide: RouteReuseStrategy, useClass: RouteReuseService}]

})
export class AppRoutingModule {}


