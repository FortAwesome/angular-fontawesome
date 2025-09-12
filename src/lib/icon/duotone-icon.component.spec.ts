import { Component, inputBinding, viewChild, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faDummy, queryByCss } from '../../testing/helpers';
import { FaDuotoneIconComponent } from './duotone-icon.component';

describe('FaDuotoneIconComponent', () => {
  it('should render the duotone icon', () => {
    const fixture = TestBed.createComponent(FaDuotoneIconComponent, {
      bindings: [inputBinding('icon', () => faDummy)],
    });
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
  });

  it('should allow to swap opacity of the layers', () => {
    const fixture = TestBed.createComponent(FaDuotoneIconComponent, {
      bindings: [inputBinding('icon', () => faDummy), inputBinding('swapOpacity', () => true)],
    });
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').classList.contains('fa-swap-opacity')).toBeTruthy();
  });

  it('should allow to customize opacity of the primary layer', () => {
    const fixture = TestBed.createComponent(FaDuotoneIconComponent, {
      bindings: [inputBinding('icon', () => faDummy), inputBinding('primaryOpacity', () => 0.1)],
    });
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').style.getPropertyValue('--fa-primary-opacity')).toBe('0.1');
  });

  it('should allow to customize opacity of the secondary layer', () => {
    const fixture = TestBed.createComponent(FaDuotoneIconComponent, {
      bindings: [inputBinding('icon', () => faDummy), inputBinding('secondaryOpacity', () => 0.9)],
    });
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').style.getPropertyValue('--fa-secondary-opacity')).toBe('0.9');
  });

  it('should allow to customize color of the primary layer', () => {
    const fixture = TestBed.createComponent(FaDuotoneIconComponent, {
      bindings: [inputBinding('icon', () => faDummy), inputBinding('primaryColor', () => 'red')],
    });
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').style.getPropertyValue('--fa-primary-color')).toBe('red');
  });

  it('should allow to customize color of the secondary layer', () => {
    const fixture = TestBed.createComponent(FaDuotoneIconComponent, {
      bindings: [inputBinding('icon', () => faDummy), inputBinding('secondaryColor', () => 'red')],
    });
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').style.getPropertyValue('--fa-secondary-color')).toBe('red');
  });

  it('should throw if specified icon is not a Duotone icon', () => {
    const fixture = TestBed.createComponent(FaDuotoneIconComponent, { bindings: [inputBinding('icon', () => faUser)] });
    expect(() => fixture.detectChanges()).toThrow(
      new Error(
        'The specified icon does not appear to be a Duotone icon. ' +
          "Check that you specified the correct style: <fa-duotone-icon [icon]=\"['fad', 'user']\" /> " +
          'or use: <fa-icon icon="user" /> instead.',
      ),
    );
  });

  it('should be able to create component dynamically', () => {
    @Component({
      selector: 'fa-host',
      template: '<ng-container #host></ng-container>',
    })
    class HostComponent {
      container = viewChild('host', { read: ViewContainerRef });

      createIcon() {
        const componentRef = this.container()!.createComponent(FaDuotoneIconComponent);
        componentRef.setInput('icon', faDummy);
      }
    }

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeFalsy();

    fixture.componentInstance.createIcon();
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
  });
});
