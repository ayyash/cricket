import { Component, Input, ContentChild, AfterContentInit, HostBinding } from '@angular/core';
import { MdInputDirective } from './mdinput.directive';

// this is a better way than smartinput directive
@Component({
    selector: 'md-input',
    template: `<div class="wrapvld req">
        <ng-content></ng-content>
        <label class="materiallabel" [class.focused]="isFocused()" *ngIf="placeholder" for="{{id}}">{{placeholder}}</label>
        <span class="invalid-feedback">{{labelText}}</span>
        <span [class.req]="required"></span>
   </div>`
})
export class MdInputComponent implements AfterContentInit {

    required: boolean;
    id: string;

    // required: boolean;
    get labelText(): string {
        return this.input.errorText;
    }

    @Input() placeholder: string;
    @Input('static') holdFocus: boolean; // if static, do not interace always show as focused


    @ContentChild(MdInputDirective)
    input: MdInputDirective;

    isFocused(): boolean {
        if (this.holdFocus) { return true; }

        if (this.input) {
            // if input focused and value is empty return tru
            return this.input.focus || !!this.input.$element.val();
        }
        return false;
    }

    ngAfterContentInit() {


        this.required = this.input.required; // dont expect this to change

        this.input.$element.addClass('materialinput');

        //  this.id = this.input.$element.attr('id');

        setTimeout(() => {
            // why? because sometimes the input is in an array and the id binding depends on the index
            // ngAfterViewInit throws an error
            this.id = this.input.$element.attr('id');
        }, 10);


    }



}