import { Injectable } from '@angular/core';
import { IconDefinition, IconName, IconPack, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export interface FaIconLibraryInterface {
  addIcons(...icons: IconDefinition[]): void;
  addIconPacks(...packs: IconPack[]): void;
  getIconDefinition(prefix: IconPrefix, name: IconName): IconDefinition | null;
}

@Injectable({ providedIn: 'root' })
export class FaIconLibrary implements FaIconLibraryInterface {
  private definitions: { [prefix: string]: { [name: string]: IconDefinition } } = {};

  addIcons(...icons: IconDefinition[]) {
    for (const icon of icons) {
      if (!(icon.prefix in this.definitions)) {
        this.definitions[icon.prefix] = {};
      }
      this.definitions[icon.prefix][icon.iconName] = icon;
    }
  }

  addIconPacks(...packs: IconPack[]) {
    for (const pack of packs) {
      const icons = Object.keys(pack).map((key) => pack[key]);
      this.addIcons(...icons);
    }
  }

  getIconDefinition(prefix: IconPrefix, name: IconName): IconDefinition | null {
    if (prefix in this.definitions && name in this.definitions[prefix]) {
      return this.definitions[prefix][name];
    }
    return null;
  }
}
