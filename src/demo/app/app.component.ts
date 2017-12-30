import { Component } from '@angular/core';
import { FontawesomeService } from 'quickstart-lib';
import { faCoffee, faSquare, faSync, faCircle } from '@fortawesome/fontawesome-free-solid';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  faCoffee = faCoffee;
  faSquare = faSquare;
  faSync = faSync;
  faCircle = faCircle;
  title = 'Font Awesome 5 Angular Demo';
  constructor(private fontawesome: FontawesomeService) {
    // Adding some icons to the library so that templates can reference them by name
    this.fontawesome.library.add(faCoffee, faSquare, faSync, faCircle );
  }
}
