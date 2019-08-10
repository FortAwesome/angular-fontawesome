import { Injectable } from '@angular/core';
import { IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { FaConfig } from '../config';

/**
 * @deprecated Since 0.5.0. Will be removed in 0.6.0. Use FaConfig directly.
 */
@Injectable({providedIn: 'root'})
export class FaIconService {
  get defaultPrefix(): IconPrefix {
    return this.config.defaultPrefix;
  }

  set defaultPrefix(value: IconPrefix) {
    this.config.defaultPrefix = value;
  }

  constructor(private config: FaConfig) {}
}
