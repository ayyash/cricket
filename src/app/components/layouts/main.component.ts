import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../utils/seo.service';

@Component({
    templateUrl: './main.component.html'
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {

    constructor( private seoService: SeoService) { }

    ngOnInit() {
    }



}
