import { Component, inputBinding, signal, viewChild, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TestBed } from '@angular/core/testing';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { initTest, queryByCss } from '../../testing/helpers';
import { FaConfig } from '../config';
import { FaIconLibrary } from '../icon-library';
import { IconProp } from '../types';
import { FaIconComponent } from './icon.component';

describe('FaIconComponent', () => {
  it('should render SVG icon', () => {
    const fixture = TestBed.createComponent(FaIconComponent, { bindings: [inputBinding('icon', () => faUser)] });
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
  });

  it('should support binding to boolean inputs', () => {
    const isInverse = signal(false);
    const fixture = TestBed.createComponent(FaIconComponent, {
      bindings: [inputBinding('icon', () => faUser), inputBinding('inverse', isInverse)],
    });
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').classList.contains('fa-inverse')).toBeFalsy();

    isInverse.set(true);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').classList.contains('fa-inverse')).toBeTruthy();
  });

  it('should be able to create component dynamically', () => {
    @Component({
      selector: 'fa-host',
      template: '<ng-container #host></ng-container>',
    })
    class HostComponent {
      container = viewChild('host', { read: ViewContainerRef });

      createIcon() {
        const componentRef = this.container()!.createComponent(FaIconComponent);
        componentRef.setInput('icon', faUser);
      }
    }

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeFalsy();

    fixture.componentInstance.createIcon();
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
  });

  it('should be able to update icon programmatically', () => {
    const fixture = TestBed.createComponent(FaIconComponent, { bindings: [inputBinding('icon', () => faUser)] });
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').classList.contains('fa-spin')).toBeFalsy();

    fixture.componentInstance.animation.set('spin');
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').classList.contains('fa-spin')).toBeTruthy();
  });

  it('should be possible to customize `role` attribute of the rendered SVG icon', () => {
    const fixture = TestBed.createComponent(FaIconComponent, {
      bindings: [inputBinding('icon', () => faUser), inputBinding('a11yRole', () => 'presentation')],
    });
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').getAttribute('role')).toBe('presentation');
  });

  it('should throw an error when icon attribute is missing', () => {
    const fixture = TestBed.createComponent(FaIconComponent, { bindings: [inputBinding('icon', () => undefined)] });
    expect(() => fixture.detectChanges()).toThrow(
      new Error('Property `icon` is required for `fa-icon`/`fa-duotone-icon` components.'),
    );
  });

  it('should work with AsyncPipe and default value', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon [icon]="icon | async" />',
    })
    class HostComponent {
      iconSubject = new Subject<IconProp>();

      icon = this.iconSubject.pipe(startWith(faCircle));
    }

    const spy = spyOn(console, 'error');

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-circle')).toBeTruthy();
    fixture.componentInstance.iconSubject.next(faUser);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-user')).toBeTruthy();
    expect(spy).not.toHaveBeenCalledWith();
  });

  it('should work with stream converted to toSignal and default value', () => {
    const iconSubject = new Subject<IconProp>();
    const icon = TestBed.runInInjectionContext(() => toSignal(iconSubject.pipe(startWith(faCircle))));
    const spy = spyOn(console, 'error');

    const fixture = TestBed.createComponent(FaIconComponent, { bindings: [inputBinding('icon', icon)] });
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-circle')).toBeTruthy();
    iconSubject.next(faUser);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-user')).toBeTruthy();
    expect(spy).not.toHaveBeenCalledWith();
  });

  it('should provide title accessibility (via attribute or SVG title element)', () => {
    const fixture = TestBed.createComponent(FaIconComponent, {
      bindings: [inputBinding('icon', () => faUser), inputBinding('title', () => 'User John Smith')],
    });
    fixture.detectChanges();

    // Check for title accessibility - FontAwesome 7+ sets title attribute on host element,
    // while older versions might create a <title> element inside the SVG
    const titleElement = queryByCss(fixture, 'svg > title');
    const hostTitleAttr = fixture.componentInstance.title();

    // Either approach provides the same accessibility benefit
    const hasTitle = titleElement !== null || hostTitleAttr === 'User John Smith';
    expect(hasTitle).toBeTruthy();

    // If there's a title element, verify its content
    if (titleElement) {
      expect(titleElement.innerHTML).toBe('User John Smith');
    }
  });

  it('should have title attribute, when title input is set using Angular binding syntax', () => {
    const fixture = TestBed.createComponent(FaIconComponent, {
      bindings: [inputBinding('icon', () => faUser), inputBinding('title', () => 'User John Smith')],
    });
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(fixture.componentInstance.title()).toBe('User John Smith');
  });

  it('should use default icon prefix', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon icon="user" />',
    })
    class HostComponent {
      constructor(iconLibrary: FaIconLibrary) {
        iconLibrary.addIcons(faUser, faUserRegular);
      }
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').getAttribute('data-prefix')).toEqual('fas');
  });

  it('should be able to override default icon prefix', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon icon="user" />',
    })
    class HostComponent {
      constructor(iconLibrary: FaIconLibrary) {
        iconLibrary.addIcons(faUser, faUserRegular);
      }
    }

    const fixture = initTest(HostComponent);
    const config = TestBed.inject(FaConfig);
    config.defaultPrefix = 'far';
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').getAttribute('data-prefix')).toEqual('far');
  });

  it('should have no fixed width by default', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon icon="user" />',
    })
    class HostComponent {
      constructor(iconLibrary: FaIconLibrary) {
        iconLibrary.addIcons(faUser, faUserRegular);
      }
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-fw')).toBeFalsy();
  });

  it('should be able to set fixed width with default config', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon icon="user" />',
    })
    class HostComponent {
      constructor(iconLibrary: FaIconLibrary) {
        iconLibrary.addIcons(faUser, faUserRegular);
      }
    }

    const fixture = initTest(HostComponent);
    const config = TestBed.inject(FaConfig);
    config.fixedWidth = true;
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-fw')).toBeTruthy();
  });

  it('should be able to set fixed width explicitly', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon icon="user" [fixedWidth]="fixedWidth()" />',
    })
    class HostComponent {
      fixedWidth = signal(true);
      constructor(iconLibrary: FaIconLibrary) {
        iconLibrary.addIcons(faUser, faUserRegular);
      }
    }

    const fixture = initTest(HostComponent);
    const config = TestBed.inject(FaConfig);
    config.fixedWidth = false;
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-fw')).toBeTruthy();
  });

  it('should be able to override global fixed width explicitly', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon icon="user" [fixedWidth]="fixedWidth()" />',
    })
    class HostComponent {
      fixedWidth = signal(false);
      constructor(iconLibrary: FaIconLibrary) {
        iconLibrary.addIcons(faUser, faUserRegular);
      }
    }

    const fixture = initTest(HostComponent);
    const config = TestBed.inject(FaConfig);
    config.fixedWidth = true;
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-fw')).toBeFalsy();
  });

  it('should use icon definition from the icon library', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon icon="user" />',
    })
    class HostComponent {
      constructor(iconLibrary: FaIconLibrary) {
        iconLibrary.addIcons(faUser);
      }
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
  });

  it('should throw an error if icon definition is not found in the icon library', () => {
    const fixture = TestBed.createComponent(FaIconComponent, { bindings: [inputBinding('icon', () => 'circle')] });
    expect(() => fixture.detectChanges()).toThrow(
      new Error('Could not find icon with iconName=circle and prefix=fas in the icon library.'),
    );
  });

  it('should display a fallback icon when specified in the config, and icon attribute is missing', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon [icon]="undefined" />',
    })
    class HostComponent {
      constructor(config: FaConfig) {
        config.fallbackIcon = faCircle;
      }
    }

    const spy = spyOn(console, 'error');
    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-circle')).toBeTruthy();
    expect(spy).not.toHaveBeenCalledWith();
  });

  it('should display the icon specified in the icon attribute when both it and the fallback icon config are present', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon [icon]="faUser()" />',
    })
    class HostComponent {
      faUser = signal(faUser);
      constructor(config: FaConfig) {
        config.fallbackIcon = faCircle;
      }
    }

    const spy = spyOn(console, 'error');
    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-user')).toBeTruthy();
    expect(queryByCss(fixture, '.fa-circle')).toBeFalsy();
    expect(spy).not.toHaveBeenCalledWith();
  });

  it('should warn when stackItemSize attribute is missing on icon inside fa-stack', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-stack><fa-icon [icon]="faCircle()" /></fa-stack>',
    })
    class HostComponent {
      faCircle = signal(faCircle);
    }

    const spy = spyOn(console, 'error');

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(
      'FontAwesome: fa-icon and fa-duotone-icon elements must specify stackItemSize attribute when wrapped into ' +
        'fa-stack. Example: <fa-icon stackItemSize="2x" />.',
    );
  });

  it('should be able to set predefined rotate as a number', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon icon="user" [rotate]="90" />',
    })
    class HostComponent {
      constructor(iconLibrary: FaIconLibrary) {
        iconLibrary.addIcons(faUser, faUserRegular);
      }
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-rotate-90')).toBeTruthy();
  });

  it('should be able to set predefined rotate as a string', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon icon="user" rotate="90" />',
    })
    class HostComponent {
      constructor(iconLibrary: FaIconLibrary) {
        iconLibrary.addIcons(faUser, faUserRegular);
      }
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-rotate-90')).toBeTruthy();
  });

  it('should be able to set customer rotate', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon icon="user" rotate="45deg" />',
    })
    class HostComponent {
      constructor(iconLibrary: FaIconLibrary) {
        iconLibrary.addIcons(faUser, faUserRegular);
      }
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    const svg = queryByCss(fixture, '.fa-rotate-by');
    expect(svg).toBeTruthy();
    expect(getComputedStyle(svg).getPropertyValue('--fa-rotate-angle')).toBe('45deg');
  });
});
