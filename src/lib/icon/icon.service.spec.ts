import { inject, TestBed } from '@angular/core/testing';
import { FaConfig } from '../config';
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

  it('should proxy value to FaConfig', inject([FaIconService, FaConfig], (service: FaIconService, config: FaConfig) => {
    expect(config.defaultPrefix).toBe('fas');
    service.defaultPrefix = 'far';
    expect(config.defaultPrefix).toBe('far');
  }));
});
