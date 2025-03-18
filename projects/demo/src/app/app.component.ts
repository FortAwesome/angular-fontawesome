import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FaConfig, FaIconLibrary, FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faFlag, faUser as regularUser } from '@fortawesome/free-regular-svg-icons';
import {
  faAdjust,
  faBatteryQuarter,
  faBell,
  faCircle,
  faCoffee,
  faCog,
  faEllipsisH,
  faFighterJet,
  faFlag as solidFlag,
  faHeart,
  faMagic,
  faSpinner,
  faSquare,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { AlternatePrefixComponent } from './alternate-prefix.component';

@Component({
  selector: 'app-root',
  imports: [DecimalPipe, FontAwesomeModule, AlternatePrefixComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  faBell = faBell;
  faCog = faCog;
  faFlag = faFlag;
  solidFlag = solidFlag;
  faTimes = faTimes;
  faMagic = faMagic;
  faAdjust = faAdjust;
  faCircle = faCircle;
  faCoffee = faCoffee;
  faSquare = faSquare;
  regularUser = regularUser;
  faEllipsisH = faEllipsisH;
  faFighterJet = faFighterJet;
  faBatteryQuarter = faBatteryQuarter;
  faHeart = faHeart;
  faSpinner = faSpinner;
  faDummy: IconDefinition = {
    prefix: 'fad',
    iconName: 'dummy',
    icon: [512, 512, [], '', ['M50 50 H412 V250 H50 Z', 'M50 262 H412 V462 H50 Z']],
  };

  notificationsCounter = 1000;
  isAnimated = true;
  magicLevel = 0;

  selectedPosition: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

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
    inject(FaIconLibrary).addIcons(faUser, regularUser);
    inject(FaConfig).fallbackIcon = faMagic;
  }

  onChange(event: any) {
    this.selectedPosition = event.target.value;
  }
}
