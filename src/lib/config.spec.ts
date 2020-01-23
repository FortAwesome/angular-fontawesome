import { inject } from '@angular/core/testing';
import { FaConfig } from './config';

describe('FaConfig', () => {
  it('should be created with a default value', inject([FaConfig], (service: FaConfig) => {
    expect(service).toBeTruthy();
    expect(service.defaultPrefix).toEqual('fas');
    expect(service.fixedWidth).toBeFalsy();
  }));
});
