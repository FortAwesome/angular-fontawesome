import { Input } from '@angular/core';
import { icon, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';

import { FaIconComponent } from '../icon.component';

/**
 * Fontawesome prefix icon base.
 */
export abstract class FaPrefixIconBaseComponent extends FaIconComponent {
  /**
   * Icon prefix.
   */
  protected readonly abstract iconPrefix: IconPrefix;
  
  /**
   * Overrides the icon input with the defined icon prefix and provided icon name.
   * @param {IconName} iconName
   */
  // tslint:disable-next-line:no-input-rename
  @Input('icon')
  private set iconName(iconName: IconName) {
    this.iconProp = { iconName, prefix: this.iconPrefix };
  }
}

