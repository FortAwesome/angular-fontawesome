import { Injectable } from '@angular/core';
import { FaIconLibraryInterface, IconDefinition, IconName, IconPrefix } from '@fortawesome/angular-fontawesome';
import { FaTestingConfig } from '../config';

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
  constructor(private config: FaTestingConfig) {}

  addIcons() {
    if (this.config.whenAddingIcons === 'throwError') {
      throw new Error(ADD_ICON_MESSAGE);
    }
    if (this.config.whenAddingIcons === 'logWarning') {
      console.warn(ADD_ICON_MESSAGE);
    }
  }

  addIconPacks() {
    if (this.config.whenAddingIcons === 'throwError') {
      throw new Error(ADD_ICON_MESSAGE);
    }
    if (this.config.whenAddingIcons === 'logWarning') {
      console.warn(ADD_ICON_MESSAGE);
    }
  }

  getIconDefinition(prefix: IconPrefix, name: IconName): IconDefinition {
    return dummyIcon;
  }
}
