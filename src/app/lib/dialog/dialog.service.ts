import {
    Injectable,
    ComponentFactoryResolver,
    ApplicationRef,
    Injector,
    Type,
    EmbeddedViewRef,
    ComponentRef,
    Inject
} from '@angular/core';
import { DialogModule } from './dialog.module';
import { DialogComponent } from './dialog.component';
import { DialogInjector } from './dialog-injector';
import { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';
import { DOCUMENT } from '@angular/common';


@Injectable({
    providedIn: DialogModule
})
export class DialogService {
    dialogComponentRef: ComponentRef<DialogComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
        @Inject(DOCUMENT) private doc: Document,
    ) {}

    public open(componentType: Type<any>, config: DialogConfig) {
        const dialogRef = this.appendDialogComponentToBody(config);

        this.dialogComponentRef.instance.childComponentType = componentType;

        return dialogRef;
    }

    private appendDialogComponentToBody(config: DialogConfig) {
        const map = new WeakMap();
        map.set(DialogConfig, config);

        const dialogRef = new DialogRef();
        map.set(DialogRef, dialogRef);

        const sub = dialogRef.afterClosed.subscribe(() => {
            this.removeDialogComponentFromBody();
            sub.unsubscribe();
        });
        // _debug(config, '0. config');
        // pass the config down to directives
        dialogRef.dialogTitle = config.title;
        dialogRef.dialogMode = config.mode;

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
        const componentRef = componentFactory.create(new DialogInjector(this.injector, map));

        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        this.doc.body.appendChild(domElem);


        this.dialogComponentRef = componentRef;

        this.dialogComponentRef.instance.onClose.subscribe(() => {
            this.removeDialogComponentFromBody();
        });

        return dialogRef;
    }

    private removeDialogComponentFromBody() {
        this.appRef.detachView(this.dialogComponentRef.hostView);
        this.dialogComponentRef.destroy();
    }
}
