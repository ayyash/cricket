
import {
    Directive, Input, Output, OnDestroy, HostListener, EventEmitter, ElementRef, Renderer,
    AfterViewInit
} from '@angular/core';
// TODO: to finish later, add filterlist and other extensions

export interface IExpandsOptions {
    guts?: string;
    src?: string;
    active?: boolean;
    togglecss?: string;
    hidesrc?: string;
    showsrc?: string;
    isvisible?: boolean; // default state, false is default
}

@Directive({
    selector: '[expands]',
    exportAs: 'expands'
})
export class ExpandsDirective implements OnDestroy, AfterViewInit {

    @Input() trigger;
    @Input() options: IExpandsOptions;
    @Input() expands: string;

    @Output() onShow = new EventEmitter();
    @Output() onHide = new EventEmitter();
    @Output() onToggle = new EventEmitter();
    @Output() onLoad = new EventEmitter();

    private defaultOptions: IExpandsOptions = {
        guts: '>.guts',
        src: '>.h',
        active: true,
        togglecss: 'toggle',
        isvisible: false
    };
    private _options: IExpandsOptions;
    private element: JQuery;
    private srcElement: JQuery;
    private gutsElement: JQuery;

    constructor(private el: ElementRef, private renderer: Renderer) {
        
    }

    ngAfterViewInit(): void {
        
        // guts and h are the esssential parts, when h is clicked, do something with visibility? or class?
        this._options = Object.assign({}, this.defaultOptions, this.options);
    
        this.element = $(this.el.nativeElement);

        this.srcElement = this.element.find(this._options.src);

        this.gutsElement = this.element.find(this._options.guts);

        // according to state, do something
        this._options.isvisible ? this.show() : this.hide();


        this.onLoad.emit();
       
    }



    @HostListener('click', ['$event.target'])
    onClick(target: HTMLElement): void {
        
        const $target: JQuery = $(target);

        if ($target.is(this.srcElement)) {
            // toggle
            this._options.isvisible ? this.hide() : this.show();
        }

        if ($target.is(this._options.showsrc)) {
            // show
            this.show();
        }
        if ($target.is(this._options.hidesrc)) {
            // hide
            this.hide();
        }


    }



    public hide(): void {
        if (!this._options.active) {
            return;
        }

        // toggle if isvisible was true
        if (this._options.isvisible) {
            this.onToggle.emit();
        }
        this._options.isvisible = false;
        this.element.removeClass(this._options.togglecss);
        this.onHide.emit();

    }
    public show(): void {
        if (!this._options.active) {
            return;
        }
        // toggle if isvisible was false
        if (!this._options.isvisible) {
            this.onToggle.emit();
        }

        this._options.isvisible = true; // change public
        this.element.addClass(this._options.togglecss);
        this.onShow.emit();
    }

    @HostListener('document:click', ['$event.target'])
    onDocClick(target: any): void {
        // if poplist, hide
        if (this.expands === 'poplist'){

            if (!jQuery.contains(this.el.nativeElement, target)) {
                this.hide();
            }
        }

    }


    ngOnDestroy(): void {
        //
        this.hide();
   
    }


}
