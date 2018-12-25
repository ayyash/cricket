import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import * as CoreComponents from './core/components';

const routes: Routes = [
    { path: '', redirectTo: 'public', pathMatch: 'full' },
    { path: 'public', component: CoreComponents.MainLayoutComponent,
        loadChildren: './components/public/public.module#PublicModule' },

    // **gulproute**
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


