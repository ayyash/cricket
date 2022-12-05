import {
   Component,
   OnInit,
   Input,
   Output,
   EventEmitter,
   ViewEncapsulation,
} from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';
import { LoaderService } from '../../services/loader.service';
import { SeoService } from '../../services/seo.service';

@Component({
   selector: 'cr-pager',
   templateUrl: './pager.partial.html',
   styleUrls: ['./pager.less'],
   encapsulation: ViewEncapsulation.None,
   standalone: true,
   imports: [CommonModule, TranslatePipe]
   // changeDetection: ChangeDetectionStrategy.OnPush // note to self, very little changes here so its okay
})
export class PagerPartialComponent implements OnInit {
   @Input() isLoadMore = false;
   @Input() source?: string;
   @Output() onPage: EventEmitter<any> = new EventEmitter();


   mimicHref = '';

   loading$: Observable<boolean>;

   constructor(private loaderService: LoaderService, private seoService: SeoService) {
      //
   }
   ngOnInit(): void {
      //
      this.loading$ = this.loaderService.stateItem$.pipe(
         filter(state => state.src === this.source),
         map(state => state ? state.show : false)
      );
      this.mimicHref = this.getMimicHref();

   }
   page(event: any): void {
      this.onPage.emit({event, source: this.source});
      // emit a show event, no just show a loading effect
    }

   getMimicHref() {
      // do your best, find "page" and add one
      // this is for SEO purposes to allow indexing of next page
      const regex = /page=(\d+)/i;
      let nextUrl = this.seoService.getPagePath();
      const pagefound = nextUrl.match(regex);

      if (pagefound && pagefound.length) {
         const p = parseInt(pagefound[1], 10) + 1;
         const x = 'page=' + p;
         nextUrl = nextUrl.replace(regex, x);
      } else {
         nextUrl += ';page=2';
      }
      return nextUrl;
   }
}
