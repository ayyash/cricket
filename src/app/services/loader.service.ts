import { Injectable } from '@angular/core';
import { Subject ,  BehaviorSubject } from 'rxjs';
import { ILoaderState } from '../core/services';

@Injectable()
export class LoaderService {
    private loaderSubject = new Subject<ILoaderState>();

    urlSubject = new BehaviorSubject<string>('');

    loaderState = this.loaderSubject.asObservable();

    show() {
        this.loaderSubject.next(<ILoaderState>{ show: true });
    }
    hide() {
        this.loaderSubject.next(<ILoaderState>{ show: false });
    }
    emitUrl(url: string) {
        this.urlSubject.next(url);
    }

}
