import { Injectable } from '@angular/core';
import { IconPrefix } from '@fortawesome/fontawesome-common-types';
import { FaIconLibrary } from './icon-library';

@Injectable({providedIn: 'root'})
export class FaConfig {
  /**
   * Default prefix to use, when one is not provided with the icon name.
   *
   * @default 'fas'
   */
  defaultPrefix: IconPrefix = 'fas';

  /**
   * Whether components should lookup icon definitions in the global icon
   * library (the one available from
   * `import { library } from '@fortawesome/fontawesome-svg-core')`.
   *
   * See https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/usage/icon-library.md
   * for detailed description of library modes.
   *
   * - 'unset' - Components should lookup icon definitions in the global library
   * and emit warning if they find a definition there. This option is a default
   * to assist existing applications with a migration. Applications are expected
   * to switch to using {@link FaIconLibrary}.
   * - true - Components should lookup icon definitions in the global library.
   * Note that global icon library is deprecated and support for it will be
   * removed. This option can be used to temporarily suppress warnings.
   * - false - Components should not lookup icon definitions in the global
   * library. Library will throw an error if missing icon is found in the global
   * library.
   *
   * @deprecated This option is deprecated since 0.5.0. In 0.6.0 default will
   * be changed to false. In 0.7.0 the option will be removed together with the
   * support for the global icon library.
   *
   * @default false
   */
  globalLibrary: boolean | 'unset' = false;
}
