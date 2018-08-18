import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FaIconComponent } from './icon.component';
import { FaIconService } from './icon.service';

const iconServiceStub: FaIconService = {
  defaultPrefix: 'fas',
};

function initTest<T>(component: Type<T>): ComponentFixture<T> {
  TestBed.configureTestingModule({
    declarations: [ FaIconComponent, component ],
    providers: [ {provide: FaIconService, useValue: iconServiceStub } ]
  });
  return TestBed.createComponent(component);
}

function svgIcon(fixture: ComponentFixture<any>): SVGElement {
  return fixture.debugElement.nativeElement.querySelector('svg');
}

describe('FaIconComponent', () => {
  it('should render SVG icon', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-icon [icon]="faUser"></fa-icon>'
    })
    class HostComponent {
      faUser = faUser;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(svgIcon(fixture)).toBeTruthy();
  });

  it('should support binding to boolean inputs', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-icon [icon]="faUser" [spin]="isAnimated"></fa-icon>'
    })
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

  describe('custom service configuration', () => {

    let fixture: ComponentFixture<HostComponent>;

    @Component({
      selector: 'fa-host',
      template: '<fa-icon icon="user"></fa-icon>'
    })
    class HostComponent {
    }

    beforeEach(() => {
      library.add(faUser, faUserRegular);
      fixture = initTest(HostComponent);
    });

    it('should use default prefix', () => {
      fixture.detectChanges();
      expect(svgIcon(fixture).getAttribute('data-prefix')).toEqual('fas');
    });

    it('should override default prefix', inject([FaIconService], (service: FaIconService) => {
      service.defaultPrefix = 'far';
      fixture.detectChanges();
      expect(svgIcon(fixture).getAttribute('data-prefix')).toEqual('far');
    }));

  });

});
