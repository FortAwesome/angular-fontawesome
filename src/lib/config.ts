import { Injectable } from '@angular/core';
import { config } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition, IconPrefix } from './types';

@Injectable({ providedIn: 'root' })
export class FaConfig {
  /**
   * Default prefix to use, when one is not provided with the icon name.
   *
   * @default 'fas'
   */
  defaultPrefix: IconPrefix = 'fas';

  /**
   * Provides a fallback icon to use whilst main icon is being loaded asynchronously.
   * When value is null, then fa-icon component will throw an error if icon input is missing.
   * When value is not null, then the provided icon will be used as a fallback icon if icon input is missing.
   *
   * @default null
   */
  fallbackIcon: IconDefinition = null;

  /**
   * Set icons to the same fixed width.
   *
   * @see {@link: https://fontawesome.com/how-to-use/on-the-web/styling/fixed-width-icons}
   * @default false
   */
  fixedWidth?: boolean;

  /**
   * Automatically add Font Awesome styles to the document when icon is rendered.
   *
   * For the majority of the cases the automatically added CSS is sufficient,
   * please refer to the linked guide for more information on when to disable
   * this feature.
   *
   * @see {@link: https://github.com/FortAwesome/angular-fontawesome/blob/main/docs/guide/adding-css.md}
   * @default true
   */
  set autoAddCss(value: boolean) {
    config.autoAddCss = value;
    this._autoAddCss = value;
  }

  get autoAddCss() {
    return this._autoAddCss;
  }

  private _autoAddCss = true;
}
