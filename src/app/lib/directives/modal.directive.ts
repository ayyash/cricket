
import {
    Directive, Input, Output, OnDestroy, HostListener, EventEmitter, ElementRef, Renderer,
    AfterViewInit
} from '@angular/core';


@Directive({
    selector: '[modal]',
    exportAs: 'modal'
})
export class ModalDirective implements OnDestroy, AfterViewInit {

    @Input('modal') trigger;
    @Input() modalSelector = '.modalwindow';

    @Output() onShow = new EventEmitter();
    @Output() onHide = new EventEmitter();
    @Output() onLoad = new EventEmitter();



    // TODO: make the props either contained in an object, or public
    // NEVER: mixup this with css, those are selectors for script only
    overlayClass = 'modaloverlay';
    closeSelector = '.closeoverlay';
    titleSelector = '.modaltitle';
    modalDialogSelector = '.modalcontent';

    $overlay: JQuery;
    $title: JQuery;
    $modalElement: JQuery;
    $modalDialog: JQuery;
    $trigger: JQuery;

    constructor(private el: ElementRef, private renderer: Renderer) {

    }

    ngAfterViewInit(): void {
        // because of the way bootstrap is working the modal itself covers the whole document
        // modal content is the actual modal

        this.$modalElement = $(this.el.nativeElement).find(this.modalSelector);

        this.$overlay = $('<div />').addClass(this.overlayClass);
        this.$title = this.$modalElement.find(this.titleSelector);

        // on body clicks of triggers

        $('body').on('click', this.trigger, (ev: any) => {

            this.show($(ev.currentTarget).attr('title'));
        });
        this.onLoad.emit();

    }
    public hide(): void {
        // hide dialog

        this.$modalElement.hide();
        this.$overlay.remove();
        this.onHide.emit();

    }
    public show(title: string): void {
        // show dialog
        this.$overlay.prependTo('body');

        // change title

        this.$title.text(title);

        this.$modalElement.show();


        this.onShow.emit();

    }



    @HostListener('click', ['$event.target'])
    onClick(target: HTMLElement): void {

        // if target outside modalcontent, hide
        if (!$(target).closest(this.modalDialogSelector).length) {

            this.hide();
        }
        // if target is close, hide
        if ($(target).is(this.closeSelector)) {
            this.hide();
        }

    }

    // @HostListener('document:click', ['$event.target'])
    // closeOverlay(target: any): void {

    //     if ($(target).is('.' + this.overlayClass)) {
    //         this.hide();
    //     }

    // }

    @HostListener('window:keydown', ['$event'])
    closeEscape(event: KeyboardEvent): void {
        if (event.keyCode === 27) {
            this.hide();
        }

    }

    ngOnDestroy(): void {
        //
        this.hide();
        $('body').off('click', this.trigger);
        $('body').off('click', '.' + this.overlayClass);

    }


}
