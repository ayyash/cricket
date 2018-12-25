import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {

} from './components';
import { MdInputModule } from '../lib/mdinput/mdinput.module';
import { LibModule } from './lib.module';


@NgModule({
    imports: [CommonModule, MdInputModule, LibModule],
    declarations: [

    ],
    exports: [CommonModule,
        FormsModule,
        MdInputModule,
        LibModule,
        ReactiveFormsModule]
})
export class SharedModule { }
