import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { EnumGaAction, EnumGaCategory, GaTracking, IGaOptions } from '../../core/ga';


@Directive({
    selector: '[crTrack]',
    exportAs: 'crGa'
})
export class GaDirective {
    @Input() crTrack: Partial<IGaOptions> = { category: EnumGaCategory.General, action: EnumGaAction.Click };

    constructor(private el: ElementRef) {

    }

    @HostListener('click', ['$event.target'])
    onClick(target: HTMLElement): void {

        GaTracking.RegisterEvent(
            this.crTrack.category || EnumGaCategory.General,
            this.crTrack.action || EnumGaAction.Click,
            this.crTrack.label,
            this.crTrack.value
        );
    }
}
