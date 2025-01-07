import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';
import { SeoService } from '../../utils/seo.service';

@Component({
    templateUrl: './main.component.html',

    imports: [TranslatePipe, RouterModule]
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {

    constructor( private seoService: SeoService) { }

    ngOnInit() {
    }



}
