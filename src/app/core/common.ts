import { environment } from '../../environments/environment';
import { EnumStatus, IUiError } from './services';
import { Res } from './resources';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';


String.prototype.toSentenceCase = function () {
    return this.substring(0, 1).toUpperCase() + this.substring(1);
};



String.prototype.toPrettyPrice = function (this: string) {
    const ret = Number(this.replace(/,/gi, ''));
    if (isNaN(ret)) { return this; }
    // read number, tofixed of 2 digits, insert "," in every three digits, if its already fixed, unfix first

    const _ret = ret.toFixed(2),
        x = _ret.toString().split('.'),
        x2 = x.length > 1 ? '.' + x[1] : '',
        rgx = /(\d+)(\d{3})/;

    let x1 = x[0];

    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
};


export class Helpers {

    public static GetParamsAsString(urlParams: any): string {
        let _url = '';
        Object.keys(urlParams).forEach(n => {
            // if array, repeat them with same key
            let p = '';
            if (urlParams[n] instanceof Array) {
                p = urlParams[n]
                    .filter(x => x !== '')
                    .map(f => n + '=' + f)
                    .join('&');

                if (p.length) _url += '&' + p;
            } else {
                if (urlParams[n]) _url += `&${n}=${urlParams[n]}`;
            }
        });

        return _url.substring(1);
    }

    public static makeDate(dateString: string): Date {
        if (dateString) {
            // do check to make sure it is valid date

            if (isNaN(Date.parse(dateString))) { return null; }

            return new Date(dateString);
        }
        return null;
    }

    public static HandleUiError(error: IUiError): void {

        if (error) {

            if (error.code) {
                // this function handles whether to show the message or the fallback, if error.code = -1
                $.Toast(error.code, { sticky: true, css: 'toaster error' }, <string>error.serverMessage);
            } else {
                // something unpredictable happened
                _debug(error, 'Something nasty', 'e');
            }

        }
    }
    public static HandleCatchError(error: IUiError, code?: string): Observable<any> {
        if (error.status === 404) {
            if (code) {
                error.code = code + '_NOT_FOUND';
            }
        }
        if (error.status === 400) {
            if (code) {
                error.code = code; // TODO: generic for all error artefacts like BOOKING_ERROR...etc
            }
        }
        Helpers.HandleUiError(error);
        return of(null);
    }

    // for piped and redirections
    public static HandleErrorAndRedirect(error: IUiError, router: Router, code?: string): Observable<any> {
        // if 404 reroute to 404, else rewroute to error page

        if (error.status === 404) {
            router.navigateByUrl('/404');
        }
        if (error.status === 400) {
            router.navigateByUrl('/error');
        }

        return Helpers.HandleCatchError(error, code);
    }

}
