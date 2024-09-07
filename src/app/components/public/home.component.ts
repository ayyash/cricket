import { Component, OnInit } from '@angular/core';
import { Res } from '../../core/resources';
import { SeoService } from '../../core/services';
@Component({

    templateUrl: './home.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class PublicHomeComponent implements OnInit {

    welcomeText = Res.Get('WELCOME_TEXT');

    constructor( private seoService: SeoService) {
        //
    }
    ngOnInit(): void {
        //
        this.seoService.setPageSeo();
    }

}
