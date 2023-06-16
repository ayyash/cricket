import { Component } from '@angular/core';
@Component({
    selector: 'app-root',
    template: '<http-loader></http-loader><router-outlet></router-outlet>'
})
export class AppComponent {
    constructor(
    ) {

        _seqlog('app component');

    }
}
