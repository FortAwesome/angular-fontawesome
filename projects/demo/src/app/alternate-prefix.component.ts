import { Component } from '@angular/core';
import { FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBellSlash, faHandPaper, faUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-alternate-prefix',
  templateUrl: './alternate-prefix.component.html',
  providers: [FaConfig],
})
export class AlternatePrefixComponent {
  constructor(faConfig: FaConfig, library: FaIconLibrary) {
    // Setting the defaultPrefix to far
    faConfig.defaultPrefix = 'far';
    // Adding dynamic icons to library for use
    library.addIcons(faUser, faHandPaper, faBellSlash);
  }
}
