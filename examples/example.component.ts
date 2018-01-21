import { Component } from '@angular/core';
import { faUser,
  faMagic,
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
  faMagic = faMagic;
  faAdjust = faAdjust;
  faCircle = faCircle;
  faSquare = faSquare;
  faSync = faSync;
  isSyncAnimated = true;
  magicLevel = 0;

  constructor() {
    library.add(faCoffee);
  }
}
