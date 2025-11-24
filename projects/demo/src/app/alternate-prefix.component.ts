import { Component, inject } from '@angular/core';
import { FaConfig, FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBellSlash, faHandPaper, faUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-alternate-prefix',
  imports: [FaIconComponent],
  templateUrl: './alternate-prefix.component.html',
  providers: [FaConfig],
})
export class AlternatePrefixComponent {
  constructor() {
    const faConfig = inject(FaConfig);
    const library = inject(FaIconLibrary);

    // Setting the defaultPrefix to far
    faConfig.defaultPrefix = 'far';
    // Adding dynamic icons to library for use
    library.addIcons(faUser, faHandPaper, faBellSlash);
  }
}
