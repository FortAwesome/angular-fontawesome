import { Component } from '@angular/core';
import { IconPrefix } from '@fortawesome/fontawesome-svg-core';

import { FaPrefixIconBaseComponent } from './prefix-icon-base.component';

/**
 * Fontawesome far icon.
 */
@Component({
  selector: `far-icon`,
  template: ``,
  host: {
    class: 'ng-fa-icon ng-far-icon'
  }
})
export class FaFarIconComponent extends FaPrefixIconBaseComponent {
  /**
   * Implemented icon prefix.
   */
  protected readonly iconPrefix: IconPrefix = 'far';
}

