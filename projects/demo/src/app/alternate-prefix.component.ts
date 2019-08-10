import { Component } from '@angular/core';
import { FaConfig } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBellSlash, faHandPaper, faUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-alternate-prefix',
  templateUrl: './alternate-prefix.component.html',
  providers: [
    FaConfig
  ]
})
export class AlternatePrefixComponent {
  constructor(private faConfig: FaConfig) {
    // Setting the defaultPrefix to far
    this.faConfig.defaultPrefix = 'far';
    // Adding dynamic icons to library for use
    library.add(faUser, faHandPaper, faBellSlash);
  }
}
