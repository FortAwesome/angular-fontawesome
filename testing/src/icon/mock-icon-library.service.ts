import { Inject, Injectable, Optional } from '@angular/core';
import { FaIconLibraryInterface, IconDefinition, IconName, IconPrefix } from '@fortawesome/angular-fontawesome';
import {
  FontAwesomeTestingModuleConfigInjectionToken,
  _FontAwesomeTestingModuleInternalConfig,
  _getFontAwesomeTestingModuleInternalConfig
} from '../TestingModuleConfig';

export const dummyIcon: IconDefinition = {
  prefix: 'fad',
  iconName: 'dummy',
  icon: [512, 512, [], '', 'M50 50 H462 V462 H50 Z'],
};

export const ADD_ICON_MESSAGE = 'Attempt to add an icon to the MockFaIconLibrary.';

@Injectable({
  providedIn: 'root',
})
export class MockFaIconLibrary implements FaIconLibraryInterface {

  private config: _FontAwesomeTestingModuleInternalConfig

  // The configuration object is optional in order to maintain backwards compatibility with versions <= 0.14.1.
  // If the module is unconfigured (that is, FontAwesomeTestingModule.forRoot() has never been called),
  // then the dependency injection will provide `null`.
  //
  // We could alternatively provide a default configuration in the `providers` array of the `NgModule` decorator,
  // but that would break the use case of injecting a service directly without providing a configuration,
  // as is done in testing/src/icon/mock-icon-library.service.spec.ts
  constructor(
    @Inject(FontAwesomeTestingModuleConfigInjectionToken) @Optional() config: _FontAwesomeTestingModuleInternalConfig
  ) {
    this.config = config ?? _getFontAwesomeTestingModuleInternalConfig()
  }
  addIcons() {
    if (this.config.whenAddingIcons === 'throwError') {
      throw new Error(ADD_ICON_MESSAGE);
    }
    if (this.config.whenAddingIcons === 'logWarning') {
      console.warn(ADD_ICON_MESSAGE)
    }
  }

  addIconPacks() {
    if (this.config.whenAddingIcons === 'throwError') {
      throw new Error(ADD_ICON_MESSAGE);
    }
    if (this.config.whenAddingIcons === 'logWarning') {
      console.warn(ADD_ICON_MESSAGE)
    }
  }

  getIconDefinition(prefix: IconPrefix, name: IconName): IconDefinition {
    return dummyIcon;
  }
}
