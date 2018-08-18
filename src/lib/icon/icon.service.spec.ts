import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { FaIconComponent } from './icon.component';
import { FaIconService } from './icon.service';

function initTest<T>(component: Type<T>): ComponentFixture<T> {
  TestBed.configureTestingModule({
    declarations: [ FaIconComponent, component ],
  });
  return TestBed.createComponent(component);
}

function svgIcon(fixture: ComponentFixture<any>): SVGElement {
  return fixture.debugElement.nativeElement.querySelector('svg');
}

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
