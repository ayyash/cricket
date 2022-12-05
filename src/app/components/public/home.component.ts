import { Component, OnInit } from '@angular/core';
import { Res } from '../../core/resources';
import { SeoService } from '../../services/seo.service';
@Component({

    templateUrl: './home.html'
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
