import { Injectable } from '@angular/core';
import { IconPrefix } from '@fortawesome/fontawesome-common-types';

@Injectable({providedIn: 'root'})
export class FaConfig {
  /**
   * Default prefix to use, when one is not provided with the icon name.
   */
  defaultPrefix: IconPrefix = 'fas';
}
