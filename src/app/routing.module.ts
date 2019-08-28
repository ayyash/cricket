import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import * as CoreComponents from './core/components';
import { PreloadService } from './services/preload.service';

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
    {
        path: '',
        component: CoreComponents.MainLayoutComponent,
        children: [
            {
                path: '',
                component: CoreComponents.PublicHomeComponent
            }
        ]
    },
    {
        path: '',
        component: CoreComponents.MainLayoutComponent,
        loadChildren: () => import('./routes/public.route').then(m => m.PublicRoutingModule),

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
            // preloadingStrategy: PreloadAllModules,
            paramsInheritanceStrategy: 'always',
            onSameUrlNavigation: 'reload', // WATCH: till now this proves nothing
            scrollPositionRestoration: 'top',
            initialNavigation: 'enabled'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}


