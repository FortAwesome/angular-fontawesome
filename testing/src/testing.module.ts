import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockFaIconLibrary } from './icon/mock-icon-library.service';

@NgModule({
  exports: [FontAwesomeModule],
  providers: [{ provide: FaIconLibrary, useExisting: MockFaIconLibrary }],
})
export class FontAwesomeTestingModule {}
