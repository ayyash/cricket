import { Component, Input } from '@angular/core';

@Component({
  selector: 'cricket-modal',
  templateUrl: './modal.partial.html'
})
export class ModalPartialComponent {
    @Input() withFooter = false;

}
