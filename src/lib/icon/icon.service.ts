import { Injectable } from '@angular/core';
import { IconPrefix } from '@fortawesome/free-solid-svg-icons';

@Injectable({providedIn: 'root'})
export class FaIconService {
  defaultPrefix: IconPrefix = 'fas';
}
