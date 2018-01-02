import { Component } from '@angular/core';
import { FontawesomeService } from 'quickstart-lib';

@Component({
  selector: 'integration-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private fontawesome: FontawesomeService) {}
}
