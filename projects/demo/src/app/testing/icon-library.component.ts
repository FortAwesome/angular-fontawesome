import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-regular-icon-library',
  imports: [FaIconComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<fa-icon icon="user" />',
})
export class IconLibraryComponent {}
