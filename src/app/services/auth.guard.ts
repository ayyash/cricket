import { Injectable } from '@angular/core';
import { Config } from '../config';
import { AuthService } from '../core/services';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(public authService: AuthService, private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
        const url: string = state.url;

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;


        if (!this.authService.isAuthenticated()) {

            this._router.navigateByUrl(Config.Basic.loginRoute);
            // login page goes to auth0
            return false;
        }

        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
        return this.canActivate(route, state);
    }
}
