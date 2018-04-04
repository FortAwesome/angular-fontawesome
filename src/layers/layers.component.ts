import { Component } from '@angular/core';

/**
 * Fontawesome layers.
 */
@Component({
  selector: 'fa-layers',
  template: `<ng-content select="fa-icon, fa-layers-text, fa-layers-counter"></ng-content>`,
  host: {
    class: 'fa-layers'
  }
})
export class FaLayersComponent {
}

