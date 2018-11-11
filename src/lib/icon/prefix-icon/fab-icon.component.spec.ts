import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { FaFabIconComponent } from './fab-icon.component';

function initTest<T>(component: Type<T>): ComponentFixture<T> {
  TestBed.configureTestingModule({
    declarations: [ FaFabIconComponent, component ]
  });
  return TestBed.createComponent(component);
}

function svgIcon(fixture: ComponentFixture<any>): SVGElement {
  return fixture.debugElement.nativeElement.querySelector('svg');
}

describe('FaFabIconComponent', () => {
  beforeEach(() => {
    library.add(faGoogle);
  });

  it('should render SVG icon', () => {
    @Component({
      selector: 'fab-host',
      template: '<fab-icon icon="google"></fab-icon>'
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(svgIcon(fixture)).toBeTruthy();
  });

  it('should support binding to boolean inputs', () => {
    @Component({
      selector: 'fab-host',
      template: '<fab-icon icon="google" [spin]="isAnimated"></fab-icon>'
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

  it('should use fab prefix', () => {
    @Component({
      selector: 'fab-host',
      template: '<fab-icon icon="google"></fab-icon>'
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(svgIcon(fixture).getAttribute('data-prefix')).toEqual('fab');
  });
});
