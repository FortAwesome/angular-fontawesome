import { Component } from '@angular/core';
import { IconPrefix } from '@fortawesome/fontawesome-svg-core';

import { FaPrefixIconBaseComponent } from './prefix-icon-base.component';

/**
 * Fontawesome fal icon.
 */
@Component({
  selector: `fal-icon`,
  template: ``,
  host: {
    class: 'ng-fa-icon ng-fal-icon'
  }
})
export class FaFalIconComponent extends FaPrefixIconBaseComponent {
  /**
   * Implemented icon prefix.
   */
  protected readonly iconPrefix: IconPrefix = 'fal';
}

