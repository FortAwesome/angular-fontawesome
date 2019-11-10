import { TestBed } from '@angular/core/testing';

import { dummyIcon, MockFaIconLibrary } from './mock-icon-library.service';

describe('MockFaIconLibrary', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service = TestBed.inject(MockFaIconLibrary);
    expect(service).toBeTruthy();
  });

  it('should return a stubbed icon when getIconDefinition is called regardless of input', () => {
    const service = TestBed.inject(MockFaIconLibrary);
    expect(service.getIconDefinition('fas', '500px')).toEqual(dummyIcon);
  });
});
