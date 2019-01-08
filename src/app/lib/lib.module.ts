import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// inject:importlibs
import { BehaviorDirective } from './directives/behavior.directive';
import { BgDirective } from './directives/bg.directive';
import { ExpandsDirective } from './directives/expands.directive';
import { ModalDirective } from './directives/modal.directive';
import { DayNamePipe } from './pipes/dayname.pipe';
import { PrettyPricePipe } from './pipes/prettyprice.pipe';
import { ResPipe } from './pipes/res.pipe';
// endinject


@NgModule({
    imports: [CommonModule],
    declarations: [
         // inject:libs
        BehaviorDirective,
        BgDirective,
        ExpandsDirective,
        ModalDirective,
        DayNamePipe,
        PrettyPricePipe,
        ResPipe,
        // endinject
    ],
    exports: [
         // inject:libs
        BehaviorDirective,
        BgDirective,
        ExpandsDirective,
        ModalDirective,
        DayNamePipe,
        PrettyPricePipe,
        ResPipe,
        // endinject
    ]
})
export class LibModule { }
