import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FaIconService } from '../lib/public_api';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faHandPaper, faBellSlash } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-alternate-prefix',
  templateUrl: './example-alternate-prefix.component.html',
  styles: []
})
export class ExampleAlternatePrefixComponent implements AfterViewInit {

  // Used to hide the component initially until the service defaultPrefix value is modified
  visible = false;

  constructor(private faIconService: FaIconService, private cdRef: ChangeDetectorRef) {
    // Adding dynamic icons to library for use
    library.add(faUser, faHandPaper, faBellSlash);

  }

  /**
   * The defaultPrefix is changed after the view is initialized in this example for demonstration purposes to prevent
   * other components from having their defaultPrefix changed - for this reason we wait until everything is rendered before changing.
   *
   * Normally the default value would be set in the application root component within the components constructor
   * to change the default icon prefix for the entire application.
   */
  ngAfterViewInit() {
    this.faIconService.defaultPrefix = 'far';
    this.visible = true;
    this.cdRef.detectChanges();
  }

}
