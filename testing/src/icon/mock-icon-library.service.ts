import { Injectable } from '@angular/core';
import { FaIconLibraryInterface } from '@fortawesome/angular-fontawesome';
import { IconPrefix, IconName, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class MockFaIconLibraryService implements FaIconLibraryInterface {
  public addIcons() {}
  public addIconPacks() {}  
  getIconDefinition(prefix: IconPrefix, name: IconName): IconDefinition {
    return faCoffee;
  }
}
