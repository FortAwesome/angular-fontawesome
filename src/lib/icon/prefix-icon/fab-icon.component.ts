import { Component } from '@angular/core';
import { IconPrefix } from '@fortawesome/fontawesome-svg-core';

import { FaPrefixIconBaseComponent } from './prefix-icon-base.component';

/**
 * Fontawesome fab icon.
 */
@Component({
  selector: `fab-icon`,
  template: ``,
  host: {
    class: 'ng-fa-icon ng-fab-icon'
  }
})
export class FaFabIconComponent extends FaPrefixIconBaseComponent {
  /**
   * Implemented icon prefix.
   */
  protected readonly iconPrefix: IconPrefix = 'fab';
}

