import { Component, signal, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { faCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { faDummy, queryByCss } from '../../testing/helpers';
import { FaIconComponent } from '../icon/icon.component';
import { FaDuotoneIconComponent } from '../icon/duotone-icon.component';
import { FaStackItemSizeDirective } from './stack-item-size.directive';
import { FaStackComponent } from './stack.component';

const imports: Type<any>[] = [FaStackComponent, FaStackItemSizeDirective, FaIconComponent];

describe('FaStackComponent', () => {
  it('should render stack icon', () => {
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
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('should work with duotone icons', () => {
    @Component({
      selector: 'fa-host',
      imports: [...imports, FaDuotoneIconComponent],
      template: `
        <fa-stack>
          <fa-icon [icon]="faCircle()" stackItemSize="2x" />
          <fa-duotone-icon [icon]="dummyDuotoneIcon()" [inverse]="true" stackItemSize="1x" />
        </fa-stack>
      `,
    })
    class HostComponent {
      dummyDuotoneIcon = signal(faDummy);
      faCircle = signal(faCircle);
    }

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'fa-duotone-icon')).toBeTruthy();
  });

  it('should include size class', () => {
    @Component({
      selector: 'fa-host',
      imports,
      template: `
        <fa-stack size="2x">
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
    expect(queryByCss(fixture, '.fa-2x')).toBeTruthy();
  });
});
