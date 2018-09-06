import { Injectable } from '@angular/core';
import { IconPrefix } from '@fortawesome/fontawesome-svg-core';

@Injectable({providedIn: 'root'})
export class FaIconService {
  defaultPrefix: IconPrefix = 'fas';
}
