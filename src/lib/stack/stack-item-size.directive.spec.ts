import { Component, ElementRef, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { faCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '../icon/icon.component';
import { FaStackItemSizeDirective } from './stack-item-size.directive';
import { FaStackComponent } from './stack.component';

const initTest = <T>(component: Type<T>): ComponentFixture<T> => {
  TestBed.configureTestingModule({
    imports: [FaStackComponent, FaStackItemSizeDirective, FaIconComponent],
    declarations: [component],
  });
  return TestBed.createComponent(component);
};

const queryByCss = (fixture: ComponentFixture<any>, cssQuery: string): ElementRef =>
  fixture.nativeElement.querySelector(cssQuery);

describe('FaStackItemSizeDirective', () => {
  it('should attach fa-stack-1x or fa-stack-2x classes to icons', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: `
        <fa-stack>
          <fa-icon [icon]="faCircle" stackItemSize="2x"></fa-icon>
          <fa-icon [icon]="faUser" [inverse]="true" stackItemSize="1x"></fa-icon>
        </fa-stack>
      `,
    })
    class HostComponent {
      faUser = faUser;
      faCircle = faCircle;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-stack-1x')).toBeTruthy();
    expect(queryByCss(fixture, '.fa-stack-2x')).toBeTruthy();
  });

  it('should throw an error when setting size input together with stackItemSize', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: `
        <fa-stack>
          <fa-icon [icon]="faCircle" stackItemSize="2x"></fa-icon>
          <fa-icon [icon]="faUser" [inverse]="true" size="1x" stackItemSize="1x"></fa-icon>
        </fa-stack>
      `,
    })
    class HostComponent {
      faUser = faUser;
      faCircle = faCircle;
    }

    expect(() => initTest(HostComponent)).toThrow(
      new Error(
        'fa-icon is not allowed to customize size when used inside fa-stack. ' +
        'Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.',
      ),
    );
  });
});
