import { TestBed } from '@angular/core/testing';

import { MockFaIconLibraryService } from './mock-icon-library.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

describe('MockFaIconLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockFaIconLibraryService = TestBed.get(MockFaIconLibraryService);
    expect(service).toBeTruthy();
  });

  it('should return a known icon when getIconDefinition is called regardless of input', () => {
    const service: MockFaIconLibraryService = TestBed.get(MockFaIconLibraryService);
    expect(service.getIconDefinition('fas', '500px')).toEqual(faCoffee);
  });
});
