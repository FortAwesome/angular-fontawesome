import { inject } from '@angular/core/testing';
import { far, faSun as farSun, faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { fas, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from './icon-library';

describe('FaIconLibrary', () => {
  it('should be possible to add an icon', inject([FaIconLibrary], (library: FaIconLibrary) => {
    library.addIcons(faUser);
    expect(library.getIconDefinition('fas', 'user')).toBe(faUser);
  }));

  it('should be possible to add multiple icons', inject([FaIconLibrary], (library: FaIconLibrary) => {
    library.addIcons(faUser, farUser);
    expect(library.getIconDefinition('fas', 'user')).toBe(faUser);
    expect(library.getIconDefinition('far', 'user')).toBe(farUser);
  }));

  it('should be possible to add an icon pack', inject([FaIconLibrary], (library: FaIconLibrary) => {
    library.addIconPacks(far);
    expect(library.getIconDefinition('far', 'user')).toBe(farUser);
  }));

  it('should be possible to add multiple icon packs', inject([FaIconLibrary], (library: FaIconLibrary) => {
    library.addIconPacks(far, fas);
    expect(library.getIconDefinition('fas', 'sun')).toBe(faSun);
    expect(library.getIconDefinition('far', 'sun')).toBe(farSun);
  }));

  it('should be possible to get an icon', inject([FaIconLibrary], (library: FaIconLibrary) => {
    library.addIcons(faUser);
    expect(library.getIconDefinition('fas', 'user')).toBe(faUser);
  }));

  it('should return null if icon prefix was not registered', inject([FaIconLibrary], (library: FaIconLibrary) => {
    expect(library.getIconDefinition('fas', 'user')).toBeNull();
  }));

  it('should return null if icon name is not registered', inject([FaIconLibrary], (library: FaIconLibrary) => {
    library.addIcons(faUser);
    expect(library.getIconDefinition('fas', 'sun')).toBeNull();
  }));
});
