import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
   // inject:libs
    BehaviorDirective,
    BgDirective,
    ExpandsDirective,
    ModalDirective,
    DayNamePipe,
    PrettyPricePipe,
    ResPipe,
    // endinject
} from './lib';



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
