import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { FaFalIconComponent } from './fal-icon.component';

// This is a mock definition for fal-user icon,
// Because there is no available free fontawesome package for fal icons.
const falMockUser: IconDefinition = {
  prefix: 'fal',
  iconName: 'user',
  icon: [
    640,
    512,
    [],
    'f0f4',
    'M0.5 0.5 L87.5 0.5'
  ]
};

function initTest<T>(component: Type<T>): ComponentFixture<T> {
  TestBed.configureTestingModule({
    declarations: [ FaFalIconComponent, component ]
  });
  return TestBed.createComponent(component);
}

function svgIcon(fixture: ComponentFixture<any>): SVGElement {
  return fixture.debugElement.nativeElement.querySelector('svg');
}

describe('FaFalIconComponent', () => {
  beforeEach(() => {
    library.add(falMockUser);
  });

  it('should render SVG icon', () => {
    @Component({
      selector: 'fal-host',
      template: '<fal-icon icon="user"></fal-icon>'
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(svgIcon(fixture)).toBeTruthy();
  });

  it('should support binding to boolean inputs', () => {
    @Component({
      selector: 'fal-host',
      template: '<fal-icon icon="user" [spin]="isAnimated"></fal-icon>'
    })
    class HostComponent {
      isAnimated = false;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(svgIcon(fixture).classList.contains('fa-spin')).toBeFalsy();

    fixture.componentInstance.isAnimated = true;
    fixture.detectChanges();
    expect(svgIcon(fixture).classList.contains('fa-spin')).toBeTruthy();
  });

  it('should use fal prefix', () => {
    @Component({
      selector: 'fal-host',
      template: '<fal-icon icon="user"></fal-icon>'
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(svgIcon(fixture).getAttribute('data-prefix')).toEqual('fal');
  });
});
