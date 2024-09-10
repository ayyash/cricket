import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ResPipe } from 'src/app/lib/pipes/res.pipe';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';
import { Res } from '../../utils/resources';
import { SeoService } from '../../utils/seo.service';
@Component({

    templateUrl: './home.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TranslatePipe, ResPipe]
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
