import { Component } from '@angular/core';
import { IconPrefix } from '@fortawesome/fontawesome-svg-core';

import { FaPrefixIconBaseComponent } from './prefix-icon-base.component';

/**
 * Fontawesome fas icon.
 */
@Component({
  selector: `fas-icon`,
  template: ``,
  host: {
    class: 'ng-fa-icon ng-fas-icon'
  }
})
export class FaFasIconComponent extends FaPrefixIconBaseComponent {
  /**
   * Implemented icon prefix.
   */
  protected readonly iconPrefix: IconPrefix = 'fas';
}

