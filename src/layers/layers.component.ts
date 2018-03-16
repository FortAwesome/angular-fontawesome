import { Component, HostBinding } from '@angular/core';

/**
 * Fontawesome layers.
 */
@Component({
  selector: 'fa-layers',
  template: `<ng-content select="fa-icon, fa-layers-text"></ng-content>`,
    styleUrls: ['layers.component.scss'],
})
export class FaLayersComponent {
  @HostBinding('class.fa-layers')
  private cssClass = true;
}

