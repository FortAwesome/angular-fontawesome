import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-explicit-reference',
  template: '<fa-icon [icon]="faUser"></fa-icon>',
})
export class ExplicitReferenceComponent {
  faUser = faUser;
}
