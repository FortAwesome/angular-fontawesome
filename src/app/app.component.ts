import { Component } from '@angular/core';
import { faCoffee, faSquare, faSync, faCircle } from '@fortawesome/fontawesome-free-solid';
import fontawesome from '@fortawesome/fontawesome';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faCoffee = faCoffee;
  faSquare = faSquare;
  faSync = faSync;
  faCircle = faCircle;
  title = 'Font Awesome 5 Angular Demo';
  constructor() {
    fontawesome.library.add(faCoffee, faSquare, faSync, faCircle );
  }
}
