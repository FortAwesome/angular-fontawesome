import { Component } from '@angular/core';
import { faUser, faAddressBook, faAdjust } from '@fortawesome/fontawesome-free-solid';

@Component({
    selector: 'example-root',
    templateUrl: './example.component.html',
    styleUrls: []
})
export class ExampleComponent {
  faUser = faUser;
  faAddressBook = faAddressBook;
  faAdjust = faAdjust;
}
