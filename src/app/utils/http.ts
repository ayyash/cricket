import {
  HttpContext,
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map, shareReplay } from 'rxjs/operators';
import { LoaderState } from '../lib/loader/loader.state';
import { ConfigService } from './config.service';
import { catchAppError, debug } from './rxjs.operators';

// create a context token
const LOADING_SOURCE = new HttpContextToken<string>(() => '');


export const applyContext = (src: string) => {
   return { context: new HttpContext().set(LOADING_SOURCE, src) };
 };

@Injectable()
export class CricketInterceptor implements HttpInterceptor {
    private isRefreshingToken = false;
    // tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private loaderService: LoaderState) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('localdata') > -1) {
            // pass through
            return next.handle(req);
        }
        const url = ConfigService.Config.API.apiRoot + req.url;


        const adjustedReq = req.clone({ url: url, setHeaders: this.getHeaders() });
        this.loaderService.show(req.context.get(LOADING_SOURCE));

        if (req.body) {
            _debug(req.body, `Request ${req.method} ${req.urlWithParams}`, 'p');
        }

        return next
            .handle(adjustedReq)
            .pipe(
                shareReplay(),
                map(response => this.mapData(response)),
                finalize(() => {
                    this.loaderService.hide(req.context.get(LOADING_SOURCE));
                }),
                debug(`${req.method} ${req.urlWithParams}`, 'p'),
                catchAppError(`${req.method} ${req.urlWithParams}`)
            );

        // do catch 401 here
    }

    private getHeaders(): any {
        //  authorization here
        let headers: any = {};


        return headers;
    }

    // if response wrapped with "data"
    private mapData(response: any) {
        if (response instanceof HttpResponse) {

            // clone body and modify so that "data" is removed as a wrapper
            if (response.body && response.body.data) {
                response = response.clone({ body: response.body.data });
            }
        }
        return response;
    }

}
