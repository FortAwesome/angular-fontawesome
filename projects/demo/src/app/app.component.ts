import { Component } from '@angular/core';
import { FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition, IconName } from '@fortawesome/fontawesome-svg-core';
import { faFlag, faUser as regularUser } from '@fortawesome/free-regular-svg-icons';
import {
  faAdjust,
  faBatteryQuarter,
  faBell,
  faCircle,
  faCoffee,
  faEllipsisH,
  faFighterJet,
  faFlag as solidFlag,
  faMagic,
  faMobile,
  faSquare,
  faSync,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  faBell = faBell;
  faSync = faSync;
  faFlag = faFlag;
  solidFlag = solidFlag;
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
  faDummy: IconDefinition = {
    prefix: 'fad',
    iconName: 'dummy' as IconName,
    icon: [512, 512, [], 'f030', ['M50 50 H412 V250 H50 Z', 'M50 262 H412 V462 H50 Z']],
  };

  notificationsCounter = 1000;
  isSyncAnimated = true;
  magicLevel = 0;

  constructor(library: FaIconLibrary, faConfig: FaConfig) {
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
    library.addIcons(faUser, regularUser);
    faConfig.fallbackIcon = faMagic;
  }
}
