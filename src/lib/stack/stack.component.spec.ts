import { Component, Type, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { faUser, faMobile } from '@fortawesome/free-solid-svg-icons';
import { By } from '@angular/platform-browser';
import { FaIconComponent } from '../icon/icon.component';
import { FaStackComponent } from './stack.component';
import { library } from '@fortawesome/fontawesome-svg-core';

function initTest<T>(component: Type<T>): ComponentFixture<T> {
  TestBed.configureTestingModule({
    declarations: [ FaStackComponent, FaIconComponent, component ],
  });
  library.add(faUser);
  return TestBed.createComponent(component);
}

function svgLayers(fixture: ComponentFixture<any>): SVGElement {
  return fixture.debugElement.nativeElement.querySelector('svg');
}

function queryByCss(fixture: ComponentFixture<any>, className: string): ElementRef {
  return fixture.debugElement.query(By.css(className));
}

function queryBySelector(fixture: ComponentFixture<any>, selector: string): ElementRef {
  return fixture.debugElement.nativeElement.querySelector(selector);
}


describe('FaStackComponent', () => {
  it('should render stack icon', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-stack>
          <fa-icon [icon]="faUser"></fa-icon>
          <fa-icon [icon]="faMobile"></fa-icon>
        </fa-stack>`
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
        <fa-stack size="2x">
          <fa-icon [icon]="faUser"></fa-icon>
          <fa-icon [icon]="faMobile"></fa-icon>
        </fa-stack>`
    })
    class HostComponent {
      faUser = faUser;
      faMobile = faMobile;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-2x')).toBeTruthy();
  });

  it('should include fixed width if no value given', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-stack fixedWidth></fa-stack>'
    })
    class HostComponent {
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-fw')).toBeTruthy();
  });

  it('should include fixed width if value given', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-stack fixedWidth="fixedWidth"></fa-stack>'
    })
    class HostComponent {
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-fw')).toBeTruthy();
  });

  it('should not include fixed width', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-stack [fixedWidth]="false"></fa-stack>'
    })
    class HostComponent {
    }
    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-fw')).toBeFalsy();
  });

  it('should add stack prefix to icon size class', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-stack size="2x">
          <fa-icon [icon]="faUser" size="3x"></fa-icon>
        </fa-stack>`
    })
    class HostComponent {
    }
    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'fa-icon.fa-stack-3x')).toBeTruthy();
  });

  it('should not add size to svg element', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-stack size="2x">
          <fa-icon icon="user" size="3x" inverse></fa-icon>
        </fa-stack>`
    })
    class HostComponent {
    }
    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryBySelector(fixture, 'svg.fa-3x')).toBeFalsy();
  });
});

