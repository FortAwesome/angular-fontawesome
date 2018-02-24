import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { faUser, faMobile } from '@fortawesome/fontawesome-free-solid';

import { FaIconComponent } from '../icon';
import { FaLayersComponent } from './layers.component';

function initTest<T>(component: Type<T>): ComponentFixture<T> {
  TestBed.configureTestingModule({
    declarations: [ FaLayersComponent, FaIconComponent, component ],
  });
  return TestBed.createComponent(component);
}

function svgLayers(fixture: ComponentFixture<any>): SVGElement {
  return fixture.debugElement.nativeElement.querySelector('svg');
}

describe('FaLayersCompoennt', () => {
  it('should render layers icon', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-layers>
          <fa-icon [icon]="faUser"></fa-icon>
          <fa-icon [icon]="faMobile"></fa-icon>
        </fa-layers>`
    })
    class HostComponent {
      faUser = faUser;
      faMobile = faMobile;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(svgLayers(fixture)).toBeTruthy();
  });
});
