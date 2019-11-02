import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockFaIconLibraryService } from './icon/mock-icon-library.service';

@NgModule({
  exports: [FontAwesomeModule],
  providers: [{ provide: FaIconLibrary, useExisting: MockFaIconLibraryService }],
})
export class FontAwesomeTestingModule {}
