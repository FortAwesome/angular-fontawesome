import { Component } from '@angular/core';
import { LibService } from 'quickstart-lib';

@Component({
  selector: 'integration-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  fontawesome: any;
  constructor(libService: LibService) {
   this.fontawesome = libService.fontawesome;
  }
}
