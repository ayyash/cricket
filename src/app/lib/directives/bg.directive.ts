import { OnInit, Directive, ElementRef, Input, Renderer, OnChanges } from '@angular/core';


@Directive({
    selector: '[shBg]',
    exportAs: 'shBg'
})
export class BgDirective implements OnChanges {

    @Input() shBg: string;
    // use this intead of behavior if the element needs to keep track of background changes

    constructor(private el: ElementRef, private renderer: Renderer) {
        //
    }
    ngOnChanges() {
        if (this.shBg) {
            this.renderer.setElementStyle(this.el.nativeElement, 'background-image', `url("${this.shBg}")`);
        }else {
            // if null, remove it
            // FIXME: double check
           // this.renderer.setElementStyle(this.el.nativeElement, 'background-image', 'none');
        }
    }

}
