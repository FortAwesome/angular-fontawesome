import { Component } from '@angular/core';
import {
  faUser,
  faSync,
  faBell,
  faTimes,
  faMagic,
  faAdjust,
  faCoffee,
  faCircle,
  faSquare,
  faMobile,
  faEllipsisH,
  faFighterJet,
  faBatteryQuarter
} from '@fortawesome/free-solid-svg-icons';
import { faUser as regularUser, faFlag } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'example-root',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  faBell = faBell;
  faSync = faSync;
  faFlag = faFlag;
  faTimes = faTimes;
  faMagic = faMagic;
  faAdjust = faAdjust;
  faCircle = faCircle;
  faCoffee = faCoffee;
  faSquare = faSquare;
  faMobile = faMobile;
  regularUser = regularUser;
  faEllipsisH = faEllipsisH;
  faFighterJet = faFighterJet;
  faBatteryQuarter = faBatteryQuarter;

  notificationsCounter = 1000;
  isSyncAnimated = true;
  magicLevel = 0;

  constructor() {
    // Notice that we're adding two different icon objects to the library.
    // Each of them within their respective icon npm packages are exported as faUser,
    // but we've renamed the second one in order to disambiguate the two objects within
    // this JavaScript module. Internally, these objects are different, even though they have the same iconName.
    // They have different prefixes: faUser has a prefix of fas, since it came from free-solid-svg-icons;
    // regularUser has a prefix of far, since it came from free-regular-svg-icons.
    // And of course, they also have different SVG content, resulting in different appearances.
    // So they really are totally different icons. However, they share the same iconName: user.
    // So in the template, the only way to reference the non-default (fas) icon is to either
    // use the array syntax that specifies [prefix, iconName], like this:
    //
    // <fa-icon [icon]="['far','user']"></fa-icon>
    //
    // Or we could make the regularUser object available to the template and simply
    // reference it as an object, like this:
    //
    // <fa-icon [icon]="regularUser"></fa-icon>
    //
    // You don't specify the prefix in that case, because the icon object knows its own prefix.
    library.add(faUser, regularUser);
  }
}
