import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// inject:importlibs
import { BgDirective } from './directives/bg.directive';
import { ExpandsDirective } from './directives/expands.directive';
import { GaDirective } from './directives/ga.directive';
import { GalleryDirective } from './directives/gallery.directive';
import { HeadingDirective } from './directives/heading.directive';
import { LazyDirective } from './directives/lazy.directive';
import { LetDirective } from './directives/let.directive';
import { ModalDirective } from './directives/modal.directive';
import { AppShellRenderDirective } from './directives/render.directive';
import { DayNamePipe } from './pipes/dayname.pipe';
import { DollarsignPipe } from './pipes/dollarsign.pipe';
import { PrettyPricePipe } from './pipes/prettyprice.pipe';
import { PrettyTimePipe } from './pipes/prettytime.pipe';
import { RelativeTimePipe } from './pipes/relativetime.pipe';
import { ResPipe } from './pipes/res.pipe';
import { ToHtmlPipe } from './pipes/tohtml.pipe';
import { TranslatePipe } from './pipes/translate.pipe';
// endinject


@NgModule({
    imports: [CommonModule],
    declarations: [
         // inject:libs
        BgDirective,
        ExpandsDirective,
        GaDirective,
        GalleryDirective,
        HeadingDirective,
        LazyDirective,
        LetDirective,
        ModalDirective,
        AppShellRenderDirective,
        DayNamePipe,
        DollarsignPipe,
        PrettyPricePipe,
        PrettyTimePipe,
        RelativeTimePipe,
        ResPipe,
        ToHtmlPipe,
        TranslatePipe,
        // endinject
    ],
    exports: [
         // inject:libs
        BgDirective,
        ExpandsDirective,
        GaDirective,
        GalleryDirective,
        HeadingDirective,
        LazyDirective,
        LetDirective,
        ModalDirective,
        AppShellRenderDirective,
        DayNamePipe,
        DollarsignPipe,
        PrettyPricePipe,
        PrettyTimePipe,
        RelativeTimePipe,
        ResPipe,
        ToHtmlPipe,
        TranslatePipe,
        // endinject
    ]
})
export class LibModule { }
