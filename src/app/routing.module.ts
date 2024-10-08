import {
    ENVIRONMENT_INITIALIZER,
    inject
} from '@angular/core';
import {
    NavigationCancel,
    NavigationEnd,
    RouteConfigLoadEnd,
    RouteReuseStrategy,
    Router,
    Routes,
    TitleStrategy,
    provideRouter,
    withComponentInputBinding,
    withEnabledBlockingInitialNavigation,
    withInMemoryScrolling,
    withPreloading,
    withRouterConfig
} from '@angular/router';
import { filter } from 'rxjs';
import { NotFoundComponent } from './components/layouts/404.component';
import { ErrorComponent } from './components/layouts/error.component';
import { MainLayoutComponent } from './components/layouts/main.component';
import { SingleLayoutComponent } from './components/layouts/single.component';
import { LoaderState } from './lib/loader/loader.state';
import { EnumGtmEvent, GtmTracking } from './utils/gtm';
import { PreloadService } from './utils/preload.service';
import { RouteReuseService } from './utils/routereuse.service';
import { CricketTitleStrategy } from './utils/title.service';

const AppRoutes: Routes = [
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


const routerFunc = (router: Router) => () => {
    const loaderState = inject(LoaderState);

    router.events
        .pipe(
            filter(
                (e) =>
                    e instanceof NavigationEnd ||
                    e instanceof NavigationCancel ||
                    e instanceof RouteConfigLoadEnd
            )
        )
        .subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // GtmTracking.Reset();

                if (event.urlAfterRedirects === '/404') {
                    // if 404 is the url, do nothing, the 404 has already been handled
                    if (event.url !== '/404') {
                        loaderState.emitUrl(event.url);
                        GtmTracking.RegisterEvent(
                            { event: EnumGtmEvent.Error },
                            { error: '404: ' + event.url }
                        );
                    }
                } else {
                    loaderState.emitUrl(event.urlAfterRedirects);
                }
            } else if (event instanceof NavigationCancel) {
                loaderState.emitUrl(event.url);
                // this happens when user isn't logged in
            }
        });
};

export const AppRouteProviders = [
    provideRouter(
        AppRoutes,
        withEnabledBlockingInitialNavigation(),
        withInMemoryScrolling({
            scrollPositionRestoration: 'disabled',
        }),
        withPreloading(PreloadService),
        withComponentInputBinding(),
        withRouterConfig({
            paramsInheritanceStrategy: 'always',
            onSameUrlNavigation: 'reload',
        })
    ),
    { provide: RouteReuseStrategy, useClass: RouteReuseService },
    { provide: TitleStrategy, useClass: CricketTitleStrategy },
    {
        provide: ENVIRONMENT_INITIALIZER,
        multi: true,
        useFactory: routerFunc,
        deps: [Router],
    },
];

// @NgModule({
//     imports: [
//         RouterModule.forRoot(routes, {
//             preloadingStrategy: PreloadService,
//             paramsInheritanceStrategy: 'always',
//             onSameUrlNavigation: 'reload',
//             scrollPositionRestoration: 'top',
//             initialNavigation: 'enabledBlocking',
//             bindToComponentInputs: true

//         })
//     ],
//     exports: [RouterModule],
//     providers: [{ provide: RouteReuseStrategy, useClass: RouteReuseService },
//     { provide: TitleStrategy, useClass: CricketTitleStrategy }]

// })
// export class AppRoutingModule {
//     constructor(
//         private router: Router,
//         private loaderState: LoaderState

//     ) {
//         _seqlog('app routing');
//         this.router.events
//             .pipe(
//                 filter(e => e instanceof NavigationEnd
//                     || e instanceof NavigationCancel
//                     || e instanceof RouteConfigLoadEnd))
//             .subscribe(event => {
//                 if (event instanceof NavigationEnd) {
//                     GtmTracking.Reset();
//                     if (event.urlAfterRedirects === '/404') {
//                         // if 404 is the url, do nothing, the 404 has already been handled
//                         if (event.url !== '/404') {
//                             this.loaderState.emitUrl(event.url);
//                             GtmTracking.RegisterEvent({ event: EnumGtmEvent.Error }, { error: '404: ' + event.url });
//                         }
//                     } else {
//                         this.loaderState.emitUrl(event.urlAfterRedirects);
//                     }
//                 } else if (event instanceof NavigationCancel) {
//                     this.loaderState.emitUrl(event.url);
//                     // this happens when user isn't logged in
//                 }


//             });

//     }
// }


