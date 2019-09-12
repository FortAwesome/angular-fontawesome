import { Injectable } from '@angular/core';
import { FaIconLibraryInterface } from '@fortawesome/angular-fontawesome';
import { IconPrefix, IconName, IconDefinition } from '@fortawesome/fontawesome-svg-core';

export const dummyIcon : IconDefinition =  {
  prefix: 'fad',
  iconName: 'dummy' as IconName,
  icon: [
    512,
    512,
    [],
    'f030',
    [
      'M50 50 H462 V462 H50 Z'
    ]
  ]
}

@Injectable({
  providedIn: 'root'
})
export class MockFaIconLibraryService implements FaIconLibraryInterface {
  public addIcons() { }
  public addIconPacks() { }
  getIconDefinition(prefix: IconPrefix, name: IconName): IconDefinition {
    return dummyIcon;
  }
}
