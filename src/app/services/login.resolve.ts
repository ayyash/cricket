import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../core/services';
import { Injectable } from '@angular/core';
import { Config } from '../config';

@Injectable()
export class LoginResolve implements Resolve<void> {
    constructor(private authService: AuthService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
        // this.userService.profile$.subscribe(authInfo => {
        //     if (authInfo.IsLoggedIn()) {
        //         this.router.navigateByUrl(Config.Basic.defaultRoute);
        //     }
        // });

        if (this.authService.isAuthenticated()) {
            this.router.navigateByUrl(Config.Basic.defaultUserRoute);
        }
    }
}
