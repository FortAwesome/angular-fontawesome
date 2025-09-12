import { Component, signal, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { queryByCss } from '../../testing/helpers';
import { faCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '../icon/icon.component';
import { FaStackItemSizeDirective } from './stack-item-size.directive';
import { FaStackComponent } from './stack.component';

const imports: Type<any>[] = [FaStackComponent, FaStackItemSizeDirective, FaIconComponent];

describe('FaStackItemSizeDirective', () => {
  it('should attach fa-stack-1x or fa-stack-2x classes to icons', () => {
    @Component({
      selector: 'fa-host',
      imports,
      template: `
        <fa-stack>
          <fa-icon [icon]="faCircle()" stackItemSize="2x" />
          <fa-icon [icon]="faUser()" [inverse]="true" stackItemSize="1x" />
        </fa-stack>
      `,
    })
    class HostComponent {
      faUser = signal(faUser);
      faCircle = signal(faCircle);
    }

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-stack-1x')).toBeTruthy();
    expect(queryByCss(fixture, '.fa-stack-2x')).toBeTruthy();
  });

  it('should throw an error when setting size input together with stackItemSize', () => {
    @Component({
      selector: 'fa-host',
      imports,
      template: `
        <fa-stack>
          <fa-icon [icon]="faCircle()" stackItemSize="2x" />
          <fa-icon [icon]="faUser()" [inverse]="true" size="1x" stackItemSize="1x" />
        </fa-stack>
      `,
    })
    class HostComponent {
      faUser = signal(faUser);
      faCircle = signal(faCircle);
    }

    const fixture = TestBed.createComponent(HostComponent);

    expect(() => fixture.detectChanges()).toThrow(
      new Error(
        'fa-icon is not allowed to customize size when used inside fa-stack. ' +
          'Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.',
      ),
    );
  });
});
