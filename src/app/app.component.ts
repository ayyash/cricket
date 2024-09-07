import { Component } from '@angular/core';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: '<http-loader></http-loader><sh-toast></sh-toast><router-outlet></router-outlet>'
})
export class AppComponent {

}
