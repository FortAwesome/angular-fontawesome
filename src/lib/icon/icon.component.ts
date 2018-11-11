import { Component } from '@angular/core';

import { FaIconBaseComponent } from './icon-base.component';

/**
 * Fontawesome icon.
 */
@Component({
  selector: 'fa-icon',
  template: ``,
  host: {
    class: 'ng-fa-icon',
  }
})
export class FaIconComponent extends FaIconBaseComponent {}

