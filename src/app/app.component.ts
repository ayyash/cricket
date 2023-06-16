import { Component } from '@angular/core';
import { NavigationEnd, Router, NavigationCancel } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoaderState } from './lib/loader/loader.state';
import { GtmTracking, EnumGtmEvent } from './utils/gtm';
@Component({
    selector: 'app-root',
    template: '<http-loader></http-loader><router-outlet></router-outlet>',
    standalone: true,
    imports: [LoaderComponent, RouterModule]
})
export class AppComponent {
    constructor(
        private router: Router,
        private LoaderService: LoaderState
    ) {

        // this.router.initialNavigation();

        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd || e instanceof NavigationCancel))
            .subscribe(event => {

                if (event instanceof NavigationEnd) {
                    GtmTracking.Reset();
                    if (event.urlAfterRedirects === '/404') {
                        // if 404 is the url, do nothing, the 404 has already been handled
                        if (event.url !== '/404') {
                            this.LoaderService.emitUrl(event.url);
                            GtmTracking.RegisterEvent({event: EnumGtmEvent.Error}, {error: '404: ' + event.url});
                        }
                    } else {
                        this.LoaderService.emitUrl(event.urlAfterRedirects);
                    }
                } else if (event instanceof NavigationCancel) {
                    this.LoaderService.emitUrl(event.url);
                    // this happens when user isn't logged in
                }


            });

    }
}
