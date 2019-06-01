import { Component, ChangeDetectorRef } from '@angular/core';
import { FaIconService } from '../../../../src/lib/icon/icon.service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faHandPaper, faBellSlash } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-alternate-prefix',
  templateUrl: './alternate-prefix.component.html',
  styles: [],
  providers: [
    FaIconService
  ]
})
export class AlternatePrefixComponent {

  constructor(private faIconService: FaIconService, private cdRef: ChangeDetectorRef) {
    // Setting the defaultPrefix to far
    this.faIconService.defaultPrefix = 'far';
    // Adding dynamic icons to library for use
    library.add(faUser, faHandPaper, faBellSlash);

  }

}
