import { Directive, ElementRef, Input, Renderer, OnChanges } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[shBg]',
    exportAs: 'shBg'
})
export class BgDirective implements OnChanges {
    @Input() shBg: string;
    @Input() lazy = false;
    // use this intead of behavior if the element needs to keep track of background changes

    constructor(private el: ElementRef, private renderer: Renderer, private platform: Platform) {
        //
    }
    ngOnChanges() {
        // if on server, do not show image
        if (!this.platform.isBrowser) {
            return;
        }

        if (this.shBg) {
            // lazyload unless set to false
            if (this.lazy && IntersectionObserver) {
                // wait for intersection
                const io = new IntersectionObserver(
                    (entries, observer) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                // load image from data-img
                                this.renderer.setElementStyle(entry.target, 'background-image', `url("${this.shBg}")`);
                                observer.disconnect();
                            }
                        });
                    },
                    {
                        threshold: 0.1
                    }
                );
                io.observe(this.el.nativeElement);
            } else {
                this.renderer.setElementStyle(this.el.nativeElement, 'background-image', `url("${this.shBg}")`);
            }
        }
    }
}
