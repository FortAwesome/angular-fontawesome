import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-explicit-reference',
  standalone: true,
  imports: [FaIconComponent],
  template: '<fa-icon [icon]="faUser"></fa-icon>',
})
export class ExplicitReferenceComponent {
  faUser = faUser;
}
