import { TestBed } from '@angular/core/testing';

import { MockFaIconLibraryService, dummyIcon } from './mock-icon-library.service';

describe('MockFaIconLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockFaIconLibraryService = TestBed.get(MockFaIconLibraryService);
    expect(service).toBeTruthy();
  });

  it('should return a stubbed icon when getIconDefinition is called regardless of input', () => {
    const service: MockFaIconLibraryService = TestBed.get(MockFaIconLibraryService);
    expect(service.getIconDefinition('fas', '500px')).toEqual(dummyIcon);
  });
});
