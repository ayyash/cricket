import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes, TitleStrategy } from '@angular/router';
import { NotFoundComponent } from './components/layouts/404.component';
import { ErrorComponent } from './components/layouts/error.component';
import { MainLayoutComponent } from './components/layouts/main.component';
import { SingleLayoutComponent } from './components/layouts/single.component';
import { PreloadService } from './utils/preload.service';
import { RouteReuseService } from './utils/routereuse.service';
import { CricketTitleStrategy } from './utils/title.service';

const routes: Routes = [
   {
      path: 'error',
      component: SingleLayoutComponent,
      children: [
         {
            path: '',
            component: ErrorComponent,
            title: 'ERROR'
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
            title: 'NOT_FOUND'
         }
      ]
   },
   // example of non lazy laded public, add declaration to app.module
   // {
   //     path: '',
   //     component: MainLayoutComponent,
   //     children: [
   //         {
   //             path: '',
   //             component: PublicHomeComponent,
   //             title: 'SITE_NAME'
   //         }
   //     ]
   // },
   //  {
   //    path: '',
   //    component: MainLayoutComponent,
   //    loadComponent: () => import('./routes/public.route').then(m => m.PublicRoutes),
   //    data: { preload: true }
   //  },
   // lazy loading? remove declration from app.module
   {
      path: '',
      component: MainLayoutComponent,
      loadChildren: () => import('./routes/public.route').then(m => m.PublicRoutes),
      data: { preload: true }

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
         paramsInheritanceStrategy: 'always',
         onSameUrlNavigation: 'reload',
         scrollPositionRestoration: 'top',
         initialNavigation: 'enabledBlocking',
         bindToComponentInputs: true

      })
   ],
   exports: [RouterModule],
   providers: [{ provide: RouteReuseStrategy, useClass: RouteReuseService },
   { provide: TitleStrategy, useClass: CricketTitleStrategy }]

})
export class AppRoutingModule { }


