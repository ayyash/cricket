import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  templateUrl: './single.component.html',
  standalone: true,
  imports: [RouterOutlet],
})
export class SingleLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
