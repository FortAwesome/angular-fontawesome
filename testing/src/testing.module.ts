import { ModuleWithProviders, NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaTestingConfig } from './config';
import { MockFaIconLibrary } from './icon/mock-icon-library.service';

@NgModule({
  exports: [FontAwesomeModule],
  providers: [{ provide: FaIconLibrary, useExisting: MockFaIconLibrary }],
})
export class FontAwesomeTestingModule {
  /**
   * Use this method to configure the module’s behaviour when trying to add icons
   * and icon packs to the mock icon library.
   */
  static forRoot(config: Partial<FaTestingConfig> = {}): ModuleWithProviders<FontAwesomeTestingModule> {
    return {
      ngModule: FontAwesomeTestingModule,
      providers: [
        {
          provide: FaIconLibrary,
          useExisting: MockFaIconLibrary,
        },
        {
          provide: FaTestingConfig,
          useFactory: () => Object.assign(new FaTestingConfig(), config),
        },
      ],
    };
  }
}
