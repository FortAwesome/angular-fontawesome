import { Component } from '@angular/core';
import { faUser,
  faAddressBook,
  faAdjust,
  faCoffee,
  faCircle,
  faSquare,
  faSync } from '@fortawesome/fontawesome-free-solid';
import { library } from '@fortawesome/fontawesome';

@Component({
  selector: 'example-root',
  templateUrl: './example.component.html',
  styleUrls: []
})
export class ExampleComponent {
  faUser = faUser;
  faAddressBook = faAddressBook;
  faAdjust = faAdjust;
  faCircle = faCircle;
  faSquare = faSquare;
  faSync = faSync;

  constructor() {
    library.add(faCoffee);
  }
}
