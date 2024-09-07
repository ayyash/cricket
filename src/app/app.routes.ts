import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/layouts/404.component';
import { ErrorComponent } from './components/layouts/error.component';
import { MainLayoutComponent } from './components/layouts/main.component';
import { SingleLayoutComponent } from './components/layouts/single.component';

export const routes: Routes = [
    {
        path: 'error',
        component: SingleLayoutComponent,
        children: [
            {
                path: '',
                component: ErrorComponent,
                data: {
                    title: 'ERROR'
                }
            }
        ]
    },
    {
        path: '404',
        component: SingleLayoutComponent,
        children: [
            {
                path: '',
                component: NotFoundComponent,
                data: {
                    title: 'NOT_FOUND'
                }
            }
        ]
    },

    {
        path: '',
        component: MainLayoutComponent,
        loadChildren: () => import('./routes/public.route').then(m => m.PublicRoutes),
        data: {preload: true}

    },
    {
        path: '**',
        redirectTo: '/404', // make 404
        pathMatch: 'full'
    }
];



