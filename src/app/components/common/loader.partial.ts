import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService, ILoaderState } from '../../core/services';

@Component({
    selector: 'http-loader',
    // templateUrl: './loader.partial.html'
    template: `<div *ngIf="show" class="httploader"><div class="line"></div></div>`
})
export class LoaderComponent implements OnInit, OnDestroy {
    show = false;
    private subscription: Subscription;

    // FIXME: the loader is too big it creates a flicker effect on fast request
    constructor(
        private loaderService: LoaderService
    ) { }

    ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: ILoaderState) => {
                this.show = state.show;
            });
    }
    ngOnDestroy() {
         this.subscription.unsubscribe();
    }
}
