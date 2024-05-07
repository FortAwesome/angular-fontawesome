import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FaTestingConfig {
  /**
   * What to do when `addIcons()` or `addIconPacks()` is invoked on
   * the FaIconLibrary provided by the FontAwesomeTestingModule.
   *
   * Possible values are:
   * - `'throwError'` -  Throw an error.
   * - `'logWarning'` - Write a warning to the console.
   * - `'noop'` - Do nothing.
   *
   * Note that in any case the icon will not be added to the library.
   *
   * @default 'throwError'
   */
  whenAddingIcons: 'throwError' | 'logWarning' | 'noop' = 'throwError';
}
