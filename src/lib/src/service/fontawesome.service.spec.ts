import { TestBed, inject } from '@angular/core/testing';

import { FontawesomeService } from './fontawesome.service';

describe('FontawesomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FontawesomeService]
    });
  });

  it('should create service', inject([FontawesomeService], (service: FontawesomeService) => {
    expect(service).toBeTruthy();
  }));
});
