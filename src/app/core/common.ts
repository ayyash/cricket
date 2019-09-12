import { IUiError } from './services';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Toast } from '../lib/toast';


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
        const s = new URLSearchParams();
        // for every key, if value is undefined, or null, or false, exclude
        Object.keys(urlParams).forEach(n => {
            const v = urlParams[n];
            if (v) {
                if (v instanceof Array) {
                    if (v.length) {
                        // filter out empty strings
                        // lookout for this, it might need an [] in the key
                        v.filter(x => x !== '').forEach(f => s.append(n, f));
                    }
                } else {
                    s.append(n, v);
                }
            }
        });
       return s.toString();

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
                Toast.Show(error.code, { sticky: true, extracss: 'error' }, <string>error.serverMessage);
            } else {
                // something unpredictable happened
                _debug(error, 'Something nasty', 't');
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
