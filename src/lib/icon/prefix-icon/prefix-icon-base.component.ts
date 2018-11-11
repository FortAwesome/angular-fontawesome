import { Input } from '@angular/core';
import { icon, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';

import { FaIconBaseComponent } from '../icon-base.component';

/**
 * Fontawesome prefix icon base.
 */
export abstract class FaPrefixIconBaseComponent extends FaIconBaseComponent {
  /**
   * Icon prefix.
   */
  protected readonly abstract iconPrefix: IconPrefix;

  /**
   * Overrides the icon input with the defined icon prefix and provided icon name.
   * @param iconName
   */
  // tslint:disable-next-line:no-input-rename
  @Input('icon')
  private set iconName(iconName: IconName) {
    this.iconProp = { iconName, prefix: this.iconPrefix };
  }
}

