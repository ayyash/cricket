import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import * as CoreComponents from './core/components';

const routes: Routes = [

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
        data: {
            search: true
        },
        loadChildren: './routes/public.route#PublicModule'
    },

    // **gulproute**
    {
        path: 'error',
        component: CoreComponents.SingleLayoutComponent,
        children: [{ path: '', component: CoreComponents.ErrorComponent }]
    },
    {
        path: '404', component: CoreComponents.SingleLayoutComponent,
        children: [
          { path: '', component: CoreComponents.NotFoundComponent }
        ]
      },
      {
        path: '**',
        redirectTo: '/404', // make 404
        pathMatch: 'full'
      }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


