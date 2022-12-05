import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
    templateUrl: './404.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NotFoundComponent implements OnInit {

    constructor(private loaderService: LoaderService) { }

    ngOnInit() {
        _debug(this.loaderService.currentItem.url, '404ed url');

    }
}
