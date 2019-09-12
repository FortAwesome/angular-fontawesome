import { Injectable } from '@angular/core';
import { FaIconLibraryInterface } from '@fortawesome/angular-fontawesome';
import { IconPrefix, IconName, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class MockFaIconLibraryService implements FaIconLibraryInterface {
  public addIcons() { }
  public addIconPacks() { }
  getIconDefinition(prefix: IconPrefix, name: IconName): IconDefinition {
    return {
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
  }
}
