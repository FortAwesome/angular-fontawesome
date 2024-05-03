import { ModuleWithProviders, NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockFaIconLibrary } from './icon/mock-icon-library.service';
import {
  FontAwesomeTestingModuleConfig,
  FontAwesomeTestingModuleConfigInjectionToken,
  _getFontAwesomeTestingModuleInternalConfig,
} from './TestingModuleConfig';

@NgModule({
  exports: [FontAwesomeModule],
  providers: [{ provide: FaIconLibrary, useExisting: MockFaIconLibrary }],
})
export class FontAwesomeTestingModule {
  /**
   * Use this method to configure the module’s behaviour when trying to add icons
   * and icon packs to the mock icon library.
   */
  public static forRoot(config: FontAwesomeTestingModuleConfig = {}): ModuleWithProviders<FontAwesomeTestingModule> {
    return {
      ngModule: FontAwesomeTestingModule,
      providers: [
        {
          provide: FaIconLibrary,
          useExisting: MockFaIconLibrary,
        },
        {
          provide: FontAwesomeTestingModuleConfigInjectionToken,
          useValue: _getFontAwesomeTestingModuleInternalConfig(config),
        }
      ]
    }
  }
}
