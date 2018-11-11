import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { FaFasIconComponent } from './fas-icon.component';

function initTest<T>(component: Type<T>): ComponentFixture<T> {
  TestBed.configureTestingModule({
    declarations: [ FaFasIconComponent, component ]
  });
  return TestBed.createComponent(component);
}

function svgIcon(fixture: ComponentFixture<any>): SVGElement {
  return fixture.debugElement.nativeElement.querySelector('svg');
}

describe('FaFasIconComponent', () => {
  beforeEach(() => {
    library.add(faUser);
  });

  it('should render SVG icon', () => {
    @Component({
      selector: 'fas-host',
      template: '<fas-icon icon="user"></fas-icon>'
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(svgIcon(fixture)).toBeTruthy();
  });

  it('should support binding to boolean inputs', () => {
    @Component({
      selector: 'fas-host',
      template: '<fas-icon icon="user" [spin]="isAnimated"></fas-icon>'
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

  it('should use fas prefix', () => {
    @Component({
      selector: 'fas-host',
      template: '<fas-icon icon="user"></fas-icon>'
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(svgIcon(fixture).getAttribute('data-prefix')).toEqual('fas');
  });
});
