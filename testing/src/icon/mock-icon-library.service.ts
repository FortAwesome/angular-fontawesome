import { Injectable } from '@angular/core';
import { FaIconLibraryInterface, IconDefinition, IconName, IconPrefix } from '@fortawesome/angular-fontawesome';

export const dummyIcon: IconDefinition = {
  prefix: 'fad',
  iconName: 'dummy',
  icon: [512, 512, [], '', 'M50 50 H462 V462 H50 Z'],
};

@Injectable({
  providedIn: 'root',
})
export class MockFaIconLibrary implements FaIconLibraryInterface {
  addIcons() {
    throw new Error('Attempt to add an icon to the MockFaIconLibrary.');
  }

  addIconPacks() {
    throw new Error('Attempt to add an icon pack to the MockFaIconLibrary.');
  }

  getIconDefinition(prefix: IconPrefix, name: IconName): IconDefinition {
    return dummyIcon;
  }
}
