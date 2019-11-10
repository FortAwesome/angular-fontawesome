import { Injectable } from '@angular/core';
import { FaIconLibraryInterface } from '@fortawesome/angular-fontawesome';
import { IconDefinition, IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export const dummyIcon: IconDefinition = {
  prefix: 'fad',
  iconName: 'dummy' as IconName,
  icon: [512, 512, [], 'f030', 'M50 50 H462 V462 H50 Z'],
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
