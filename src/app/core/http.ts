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
import { LoaderService, AuthService } from './services';


@Injectable()
export class CricketInterceptor implements HttpInterceptor {
    private isRefreshingToken = false;
    // tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private loaderService: LoaderService, private authService: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = Config.API.apiRoot + req.url;
        // FIXME: TODO: remove this once api is fixed
        if (req.url.indexOf('http://') > -1) {
            url = req.url;
        }

        const adjustedReq = req.clone({ url: url, setHeaders: this.getHeaders(req.headers) });
        this.loaderService.show();

        return next
            .handle(adjustedReq)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    // catch 401

                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 401) {
                            return this.handle401Error(adjustedReq, next);
                        } else if (error.status === 400 && error.error && error.error.error === 'invalid_grant') {
                            error.error.code = 'INVALID_LOGIN';
                            this.authService.logout();
                            // is this error ever possible? to check: when server returns invalud after refresh token
                        }
                    }
                    return throwError(error);
                }),
                finalize(() => {
                    this.loaderService.hide();
                })
            )
            .catchProjectError(req.urlWithParams, req.method)
            .debug(req.urlWithParams, req.method);
        // do catch 401 here
    }

    private getHeaders(reqheaders: HttpHeaders): any {
        //  authorization here
        let headers: any = {};

        // if headers exist, ignore it
        // if (!reqheaders.get('authorization')) {

        const _auth = this.authService.getToken();

        if (_auth && _auth !== '') {
            headers['authorization'] = `Bearer ${_auth}`;
        }
        // }

        // headers['Accept'] = 'application/json';

        return headers;
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            // this.tokenSubject.next(null);

            return this.authService
                .RefreshToken()
                .pipe(
                    switchMap((result: boolean) => {

                        if (result) {
                            // this.tokenSubject.next(this.authService.getToken());

                            const adjustedReq = req.clone({ setHeaders: this.getHeaders(req.headers) });
                            return next.handle(adjustedReq);
                        }

                        // If we don't get a new token, we are in trouble so logout.
                        this.authService.logout();
                        return throwError('UNAUTHORIZED');
                    }),
                    catchError(error => {
                        // If there is an exception calling 'refreshToken', bad news so logout.
                        this.authService.logout();
                        return throwError(error);
                    }),
                    finalize(() => {
                        this.isRefreshingToken = false;
                    })
                )
                .debug(req.urlWithParams, req.method);
                // .catchProjectError(req.urlWithParams, req.method);
        } else {
            const adjustedReq = req.clone({ setHeaders: this.getHeaders(req.headers) });
            return next.handle(adjustedReq);
        }
    }
}
