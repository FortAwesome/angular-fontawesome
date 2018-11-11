import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import { FaFarIconComponent } from './far-icon.component';

function initTest<T>(component: Type<T>): ComponentFixture<T> {
  TestBed.configureTestingModule({
    declarations: [ FaFarIconComponent, component ]
  });
  return TestBed.createComponent(component);
}

function svgIcon(fixture: ComponentFixture<any>): SVGElement {
  return fixture.debugElement.nativeElement.querySelector('svg');
}

describe('FaFarIconComponent', () => {
  beforeEach(() => {
    library.add(faUser);
  });

  it('should render SVG icon', () => {
    @Component({
      selector: 'far-host',
      template: '<far-icon icon="user"></far-icon>'
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(svgIcon(fixture)).toBeTruthy();
  });

  it('should support binding to boolean inputs', () => {
    @Component({
      selector: 'far-host',
      template: '<far-icon icon="user" [spin]="isAnimated"></far-icon>'
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

  it('should use far prefix', () => {
    @Component({
      selector: 'far-host',
      template: '<far-icon icon="user"></far-icon>'
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(svgIcon(fixture).getAttribute('data-prefix')).toEqual('far');
  });
});
