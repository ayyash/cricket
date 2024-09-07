import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from '../../core/services';

@Component({
    templateUrl: './main.component.html',
    standalone: true,
    imports: [RouterOutlet],
})
export class MainLayoutComponent implements OnInit {

    constructor( private seoService: SeoService) { }

    ngOnInit() {
    }



}
