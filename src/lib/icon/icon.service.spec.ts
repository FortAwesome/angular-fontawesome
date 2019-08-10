import { inject, TestBed } from '@angular/core/testing';
import { FaIconService } from './icon.service';

describe('FaIconService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaIconService]
    });
  });

  it('should be created with default properties', inject([FaIconService], (service: FaIconService) => {
    expect(service).toBeTruthy();
    expect(service.defaultPrefix).toEqual('fas');
  }));
});
