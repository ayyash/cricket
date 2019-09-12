import { throwError, Observable } from 'rxjs';
import { switchMap, catchError, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';
import { Config } from '../config';
import { ConfigService, LoaderService, AuthService } from './services';


@Injectable()
export class CricketInterceptor implements HttpInterceptor {
    private isRefreshingToken = false;
    // tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private loaderService: LoaderService, private authService: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('localdata') > -1 ) {
            // pass through
           return next.handle(req);
        }
        const url = ConfigService.Config.API.apiRoot + req.url;


        const adjustedReq = req.clone({ url: url, setHeaders: this.getHeaders(req.headers) });
        this.loaderService.show();

        return next
            .handle(adjustedReq)
            .pipe(
              
                finalize(() => {
                    this.loaderService.hide();
                })
            )
            .catchProjectError(req.urlWithParams, req.method)
            .debug(req.urlWithParams, req.method, 'p');
        // do catch 401 here
    }

    private getHeaders(reqheaders: HttpHeaders): any {
        //  authorization here
        let headers: any = {};


        return headers;
    }

  
}
