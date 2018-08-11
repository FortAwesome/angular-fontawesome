import { Component, Type, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { faUser, faMobile } from '@fortawesome/free-solid-svg-icons';
import { By } from '@angular/platform-browser';
import { FaIconComponent } from '../icon/icon.component';
import { FaLayersComponent } from './layers.component';
import { FaLayersTextComponent } from './layers-text.component';

function initTest<T>(component: Type<T>): ComponentFixture<T> {
  TestBed.configureTestingModule({
    declarations: [ FaLayersComponent, FaIconComponent, FaLayersTextComponent, component ],
  });
  return TestBed.createComponent(component);
}

function svgLayers(fixture: ComponentFixture<any>): SVGElement {
  return fixture.debugElement.nativeElement.querySelector('svg');
}

function queryByCss(fixture: ComponentFixture<any>, className: string): ElementRef {
  return fixture.debugElement.query(By.css(className));
}

describe('FaLayersCompoennt', () => {
  it('should render layers icon', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-layers>
          <fa-icon [icon]="faUser"></fa-icon>
          <fa-icon [icon]="faMobile"></fa-icon>
          <fa-layers-text [content]="'User with mobile'" [styles]="{ color: 'Tomato' }"></fa-layers-text>
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

  it('should include size class', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-layers size="2x">
          <fa-icon [icon]="faUser"></fa-icon>
          <fa-icon [icon]="faMobile"></fa-icon>
          <fa-layers-text [content]="'User with mobile'" [styles]="{ color: 'Tomato' }"></fa-layers-text>
        </fa-layers>`
    })
    class HostComponent {
      faUser = faUser;
      faMobile = faMobile;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-2x')).toBeTruthy();
  });

  it('should include fixed width', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-layers [fixedWidth]="true">
          <fa-icon [icon]="faUser"></fa-icon>
          <fa-icon [icon]="faMobile"></fa-icon>
          <fa-layers-text [content]="'User with mobile'" [styles]="{ color: 'Tomato' }"></fa-layers-text>
        </fa-layers>`
    })
    class HostComponent {
      faUser = faUser;
      faMobile = faMobile;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-fw')).toBeTruthy();
  });


  it('should not include fixed width', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-layers [fixedWidth]="false">
          <fa-icon [icon]="faUser"></fa-icon>
          <fa-icon [icon]="faMobile"></fa-icon>
          <fa-layers-text [content]="'User with mobile'" [styles]="{ color: 'Tomato' }"></fa-layers-text>
        </fa-layers>`
    })
    class HostComponent {
      faUser = faUser;
      faMobile = faMobile;
    }
    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-fw')).toBeFalsy();
  });
});

