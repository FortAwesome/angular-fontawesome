import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faDummy, initTest, queryByCss } from '../../testing/helpers';
import { FaDuotoneIconComponent } from './duotone-icon.component';

describe('FaDuotoneIconComponent', () => {
  it('should render the duotone icon', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-duotone-icon [icon]="faDummy"></fa-duotone-icon>',
    })
    class HostComponent {
      faDummy = faDummy;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
  });

  it('should allow to swap opacity of the layers', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-duotone-icon [icon]="faDummy" [swapOpacity]="true"></fa-duotone-icon>',
    })
    class HostComponent {
      faDummy = faDummy;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').classList.contains('fa-swap-opacity')).toBeTruthy();
  });

  it('should allow to customize opacity of the primary layer', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-duotone-icon [icon]="faDummy" [primaryOpacity]="0.1"></fa-duotone-icon>',
    })
    class HostComponent {
      faDummy = faDummy;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').style.getPropertyValue('--fa-primary-opacity')).toBe(' 0.1');
  });

  it('should allow to customize opacity of the secondary layer', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-duotone-icon [icon]="faDummy" [secondaryOpacity]="0.9"></fa-duotone-icon>',
    })
    class HostComponent {
      faDummy = faDummy;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').style.getPropertyValue('--fa-secondary-opacity')).toBe(' 0.9');
  });

  it('should allow to customize color of the primary layer', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-duotone-icon [icon]="faDummy" primaryColor="red"></fa-duotone-icon>',
    })
    class HostComponent {
      faDummy = faDummy;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').style.getPropertyValue('--fa-primary-color')).toBe(' red');
  });

  it('should allow to customize color of the secondary layer', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-duotone-icon [icon]="faDummy" secondaryColor="red"></fa-duotone-icon>',
    })
    class HostComponent {
      faDummy = faDummy;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').style.getPropertyValue('--fa-secondary-color')).toBe(' red');
  });

  it('should throw if specified icon is not a Duotone icon', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-duotone-icon [icon]="faUser"></fa-duotone-icon>',
    })
    class HostComponent {
      faUser = faUser;
    }

    const fixture = initTest(HostComponent);
    expect(() => fixture.detectChanges()).toThrow(
      new Error(
        'The specified icon does not appear to be a Duotone icon. ' +
          "Check that you specified the correct style: <fa-duotone-icon [icon]=\"['fad', 'user']\"></fa-duotone-icon> " +
          'or use: <fa-icon icon="user"></fa-icon> instead.',
      ),
    );
  });

  it('should be able to create component dynamically', () => {
    @Component({
      selector: 'fa-host',
      template: '<ng-container #host></ng-container>',
    })
    class HostComponent {
      @ViewChild('host', { static: true, read: ViewContainerRef }) container: ViewContainerRef;

      constructor(private cfr: ComponentFactoryResolver) {}

      createIcon() {
        const factory = this.cfr.resolveComponentFactory(FaDuotoneIconComponent);
        const componentRef = this.container.createComponent(factory);
        componentRef.instance.icon = faDummy;
        componentRef.instance.render();
      }
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeFalsy();

    fixture.componentInstance.createIcon();
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
  });
});
