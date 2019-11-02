import { Component } from '@angular/core';
import { faCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { faDummy, initTest, queryByCss } from '../../testing/helpers';
import { FaStackComponent } from './stack.component';

describe('FaStackComponent', () => {
  it('should render stack icon', () => {
    @Component({
      selector: 'fa-host',
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
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('should work with duotone icons', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-stack>
          <fa-icon [icon]="faCircle" stackItemSize="2x"></fa-icon>
          <fa-duotone-icon [icon]="dummyDuotoneIcon" [inverse]="true" stackItemSize="1x"></fa-duotone-icon>
        </fa-stack>
      `,
    })
    class HostComponent {
      dummyDuotoneIcon = faDummy;
      faCircle = faCircle;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'fa-duotone-icon')).toBeTruthy();
  });

  it('should include size class', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-stack size="2x">
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
    expect(queryByCss(fixture, '.fa-2x')).toBeTruthy();
  });
});
