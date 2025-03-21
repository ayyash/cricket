import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CricketTitleStrategy extends TitleStrategy {
  // -- with SEO:
  // constructor(private seoService: SeoService) {
  //   super();
  // }

  // override updateTitle(routerState: RouterStateSnapshot) {
  //   const title = this.buildTitle(routerState);
  //   this.seoService.setPage(title);
  // }
  constructor(private title: Title) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const key = this.buildTitle(routerState) || '';

    const pageKey = Res.Get('PAGE_TITLES') || {};
    const _title = pageKey[key] || Res.Get('DEFAULT_PAGE_TITLE');

    this.title.setTitle(`${_title} - ${Res.Get('SITE_NAME')}`);
  }
}
