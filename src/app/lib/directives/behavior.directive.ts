
import {
    Directive, Input, ElementRef, Renderer, AfterViewInit, OnDestroy
} from '@angular/core';


@Directive({
    selector: '[behavior]',
    exportAs: 'shBehavior'
})
export class BehaviorDirective implements AfterViewInit, OnDestroy {

    @Input() behavior: string;

    private behaviorsObjects: any[];

    constructor(private el: ElementRef, private renderer: Renderer) {
        this.behaviorsObjects = [];
    }


    ngAfterViewInit(): void {
        const behaviors = this.behavior.split(',');

        behaviors.forEach(n => {
            if ($.Sh[n]) {
                this.behaviorsObjects.push($.Sh[this.behavior](this.el.nativeElement, this.renderer));
            } else {
                _debug(n, 'behavior not implemented');
            }
        });

    }

    // on destroy
    ngOnDestroy(): void {
        // remove element?
        this.behaviorsObjects.forEach(n => {
            // if exists and destroy is implemented call
            if (n && n.Destroy) {

                n.Destroy();
            }
        });
    }
}
