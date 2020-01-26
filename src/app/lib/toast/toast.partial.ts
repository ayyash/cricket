import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Toast } from './toast.service';
import { IToast } from './toast.model';

@Component({
    selector: 'sh-toast',
    template: `
        <ng-container *ngIf="(toast$ | async) as toast">
            <div class="{{toast.css}} {{ toast.extracss }}" [class.out]="toast.isHiding">
                <div>
                {{ toast.text }}
                </div>
                <span
                    class="symbol icon-close closelabel"
                    title="{{ toast.closetext }}"
                    (click)="hide()"
                ></span></div></ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./toast.less']
})
export class ToastPartialComponent implements OnInit, OnDestroy {
    toast$: Observable<IToast>;

    constructor(private toastService: Toast) {
        //
    }
    ngOnInit(): void {
         // WATCH: static service does not need injection, lets try but keep an eye
         // this is why the toast cannot be called on load from server
        
        this.toast$ = this.toastService.toast$.debug('TOAST', 'Subject');
    }
    hide(): void {
        this.toastService.Hide();
    }
    ngOnDestroy(): void {

        this.toastService.Hide();
    }
}
