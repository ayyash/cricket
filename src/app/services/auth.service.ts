import { Injectable, Injector } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, publishLast, refCount } from 'rxjs/operators';
import { Config } from '../config';
import { IAuthInfo, AuthInfo, IUser, User, IListOptions } from '../core/services';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// skimming down because i need injector so that i can use it in http interceptor. This presents syncing issues
// with the rest of the app, so im skimming down to the bare minimum

@Injectable()
export class AuthService {
    private _refreshUrl = Config.API.user.refresh;
    private _tokenUrl = Config.API.user.token;
    private _resetUrl = Config.API.user.reset;
    private _newUrl = Config.API.user.newpassword;

    get redirectUrl(): string {
        return localStorage.getObject('redirectUrl');
    }
    set redirectUrl(value: string) {
        localStorage.setObject('redirectUrl', value);
    }

    private _http: HttpClient;

    constructor(private router: Router, private injector: Injector) {
        setTimeout(() => (this._http = injector.get(HttpClient)));
    }

    public static saveSession(resUser: IAuthInfo): void {
        if (resUser.accessToken) {
            // this is number of seconds, check with backeend if its minutes
            // minutes or seconds multiple by 60
            resUser.expiresAt = JSON.stringify(resUser.expiresIn * 60 * 1000 + new Date().getTime());

            localStorage.setItem(Config.Auth.userAccessKey, JSON.stringify(resUser));
            // change this to storage, lieh? to configure expiration?!
            // note to self, storage is for cache only

            // set default search if not already set

        } else {
            // remove token from user
            localStorage.removeItem(Config.Auth.userAccessKey);
        }
    }



    getToken(): string {
        return this.GetAuthInfo().accessToken;
    }

    // get localiser
    GetAuthInfo(): IAuthInfo {
        const _localuser = JSON.parse(localStorage.getItem(Config.Auth.userAccessKey));

        if (_localuser && _localuser.accessToken) {
            return _localuser;
        }
        return {};
    }

    init(): boolean {
        // get user from storage
        // also: if defaults are not set, set them

        if (this.GetAuthInfo().accessToken) {
            return true;
        }
        return false;
    }

    logout(): void {
        // Remove tokens and expiry time from localStorage

        localStorage.removeItem(Config.Auth.userAccessKey);
        // this.redirectUrl = Config.Basic.defaultUserRoute;
    }

    Login(username: string, password: string): Observable<IAuthInfo> {
        const data = AuthInfo.PrepAccessToken(username, password);
        _debug(data, 'Login data');

        return this._http.post(this._tokenUrl, data).pipe(
            map(response => {
                const resUser: IAuthInfo = AuthInfo.NewInstance(<any>response);
                if (!resUser.accessToken) {
                    return null;
                }
                AuthService.saveSession(resUser);

                return resUser;
            })
        );
    }

    ResetPassword(username: string): Observable<boolean> {
        const data = AuthInfo.PrepReset(username);
        _debug(data, 'ResetPassword data');

        return this._http.post(this._resetUrl, data).pipe(
            map(response => {
                return true;
            })
        );
    }

    SaveResetPassword(password: string, code: string): Observable<boolean> {
        const data = AuthInfo.PrepSaveNew(password, code);
        _debug(data, 'SaveResetPassword data');

        return this._http.post(this._newUrl, data).pipe(
            map(response => {
                return true;
            })
        );
    }
    isAuthenticated(): boolean {
        // Check whether the current time is past the access token's expiry time

        const _localUser = this.GetAuthInfo();
        if (!_localUser.accessToken || !_localUser.expiresAt) {
            return false;
        }
        if (new Date().getTime() < _localUser.expiresAt) {
            return true;
        }
        // let refreshtoken be fired next http request, u have to keep the token
        // localStorage.removeItem(Config.Auth.userAccessKey);
        return false;
    }

    RefreshToken(): Observable<any> {
        let resUser = this.GetAuthInfo();
        // const data = AuthInfo.PrepRefreshToken(resUser);
        _debug(resUser, 'RefreshToken data'); // not needed!

        return this._http.get(this._refreshUrl).pipe(
            map(response => {
                // shit!

                if (!response) {
                    return false;
                }

                resUser = AuthInfo.UpdateInfo(resUser, <any>response);

                if (!resUser.accessToken) {
                    return false;
                }

                AuthService.saveSession(resUser);

                return true;
            }),
            publishLast(),
            refCount()
        );
    }
}
