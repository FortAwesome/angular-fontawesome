import { Injectable } from '@angular/core';
import { IconDefinition, IconName, IconPack, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export interface FaIconLibraryInterface {
  addIcons(icons: IconDefinition[]): void;
  addIconPacks(...packs: IconPack[]): void;
  getIconDefinition(prefix: IconPrefix, name: IconName): IconDefinition | null;
}

@Injectable({providedIn: 'root'})
export class FaIconLibrary {
  private definitions: { [prefix: string]: { [name: string]: IconDefinition } } = {};

  addIcons(...icons: IconDefinition[]) {
    for (let i = 0; i < icons.length; i++) {
      const icon = icons[i];
      if (!(icon.prefix in this.definitions)) {
        this.definitions[icon.prefix] = {};
      }
      this.definitions[icon.prefix][icon.iconName] = icon;
    }
  }

  addIconPacks(...packs: IconPack[]) {
    for (let i = 0; i < packs.length; i++) {
      const pack = packs[i];
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
