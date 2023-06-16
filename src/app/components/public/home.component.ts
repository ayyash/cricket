import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';
import { Res } from '../../utils/resources';
import { SeoService } from '../../utils/seo.service';
@Component({

    templateUrl: './home.html',
    standalone: true,
    imports: [TranslatePipe]
})
export class PublicHomeComponent implements OnInit {

    welcomeText = Res.Get('WELCOME_TEXT');

    constructor( private seoService: SeoService) {
        //
    }
    ngOnInit(): void {
        //
    }

}
