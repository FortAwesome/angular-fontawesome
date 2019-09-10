import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { MockFaIconLibraryService } from './icon/mock-icon-library.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FontAwesomeModule
  ],
  providers: [
    { provide: FaIconLibrary, useExisting: MockFaIconLibraryService }
  ]
})
export class FontAwesomeTestingModule { }
