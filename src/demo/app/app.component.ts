import { Component } from '@angular/core';
import { LibService } from 'quickstart-lib';
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
  constructor(libService: LibService) {
    console.log("typeof fontawesome: " + typeof libService.fontawesome);
    libService.fontawesome.library.add(faCoffee, faSquare, faSync, faCircle );
  }
}
