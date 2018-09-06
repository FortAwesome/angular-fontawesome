import { Component, ChangeDetectorRef } from '@angular/core';
import { FaIconService } from '../lib/icon/icon.service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faHandPaper, faBellSlash } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-alternate-prefix',
  templateUrl: './example-alternate-prefix.component.html',
  styles: [],
  providers: [
    FaIconService
  ]
})
export class ExampleAlternatePrefixComponent {

  constructor(private faIconService: FaIconService, private cdRef: ChangeDetectorRef) {
    // Setting the defaultPrefix to far
    this.faIconService.defaultPrefix = 'far';
    // Adding dynamic icons to library for use
    library.add(faUser, faHandPaper, faBellSlash);

  }

}
