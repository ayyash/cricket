import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../core/services';
@Component({

    templateUrl: './home.html'
})
export class PublicHomeComponent implements OnInit {

    constructor( private seoService: SeoService) {
        //
    }
    ngOnInit(): void {
        //
        // this.seoService.SetHomeSeo();
        this.seoService.setPageSeo();
    }

}
