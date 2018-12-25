import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoaderService } from './core/services';
@Component({
    selector: 'app-root',
    template: '<http-loader></http-loader><router-outlet></router-outlet>'
})
export class AppComponent {
    // on navigation end, update url?
    constructor(private _router: Router, private LoaderService: LoaderService) {
        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.LoaderService.emitUrl(event.url);
                window.document.body.scrollTo({ top: 0 });
                // $('html').scrollTop(0);
            }
        });
    }
}
