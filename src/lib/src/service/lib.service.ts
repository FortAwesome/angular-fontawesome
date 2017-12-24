import { Injectable } from '@angular/core';
import * as api from '@fortawesome/fontawesome';

@Injectable()
export class LibService {
  fontawesome: any = api;
}
