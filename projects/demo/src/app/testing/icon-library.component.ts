import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-regular-icon-library',
  standalone: true,
  imports: [FaIconComponent],
  template: '<fa-icon icon="user"></fa-icon>',
})
export class IconLibraryComponent {}
