import { ComponentFixture, TestBed } from '@angular/core/testing';
import { faUser } from '@fortawesome/fontawesome-free-solid/faUser';
import { FaIconComponent } from './icon.component';
import { Component, Type } from '@angular/core';

function initTest<T>(component: Type<T>): ComponentFixture<T> {
  TestBed.configureTestingModule({
    declarations: [ FaIconComponent, component ],
  });
  return TestBed.createComponent(component);
}

function svgIcon(fixture: ComponentFixture<any>): SVGElement {
  return fixture.debugElement.nativeElement.querySelector('svg');
}

describe('FaIconComponent', () => {
  it('should render SVG icon', () => {
    @Component({ selector: 'fa-host', template: '<fa-icon [icon]="faUser"></fa-icon>' })
    class HostComponent {
      faUser = faUser;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(svgIcon(fixture)).toBeTruthy();
  });

  it('should support binding to boolean inputs', () => {
    @Component({ selector: 'fa-host', template: '<fa-icon [icon]="faUser" [spin]="isAnimated"></fa-icon>' })
    class HostComponent {
      faUser = faUser;
      isAnimated = false;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(svgIcon(fixture).classList.contains('fa-spin')).toBeFalsy();

    fixture.componentInstance.isAnimated = true;
    fixture.detectChanges();
    expect(svgIcon(fixture).classList.contains('fa-spin')).toBeTruthy();
  });
});
