import { Component, signal, viewChild, ViewContainerRef } from '@angular/core';
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
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon [icon]="faUser()"></fa-icon>',
    })
    class HostComponent {
      faUser = signal(faUser);
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
  });

  it('should support binding to boolean inputs', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon [icon]="faUser()" [inverse]="isInverse()"></fa-icon>',
    })
    class HostComponent {
      faUser = signal(faUser);
      isInverse = signal(false);
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').classList.contains('fa-inverse')).toBeFalsy();

    fixture.componentInstance.isInverse.set(true);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').classList.contains('fa-inverse')).toBeTruthy();
  });

  it('should be able to create component dynamically', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<ng-container #host></ng-container>',
    })
    class HostComponent {
      container = viewChild('host', { read: ViewContainerRef });

      createIcon() {
        const componentRef = this.container()!.createComponent(FaIconComponent);
        componentRef.setInput('icon', faUser);
      }
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeFalsy();

    fixture.componentInstance.createIcon();
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
  });

  it('should be able to update icon programmatically', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon [icon]="faUser()"></fa-icon>',
    })
    class HostComponent {
      iconComponent = viewChild(FaIconComponent);

      faUser = signal(faUser);
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').classList.contains('fa-spin')).toBeFalsy();

    fixture.componentInstance.iconComponent()!.animation.set('spin');
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').classList.contains('fa-spin')).toBeTruthy();
  });

  it('should be possible to customize `role` attribute of the rendered SVG icon', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon [icon]="faUser()" a11yRole="presentation"></fa-icon>',
    })
    class HostComponent {
      faUser = signal(faUser);
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').getAttribute('role')).toBe('presentation');
  });

  it('should throw an error when icon attribute is missing', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon [icon]="undefined"></fa-icon>',
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);
    expect(() => fixture.detectChanges()).toThrow(
      new Error('Property `icon` is required for `fa-icon`/`fa-duotone-icon` components.'),
    );
  });

  it('should work with AsyncPipe and default value', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon [icon]="icon | async"></fa-icon>',
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
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon [icon]="icon()"></fa-icon>',
    })
    class HostComponent {
      iconSubject = new Subject<IconProp>();

      icon = toSignal(this.iconSubject.pipe(startWith(faCircle)));
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

  it('should provide title accessibility (via attribute or SVG title element)', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon [icon]="faUser()" title="User John Smith"></fa-icon>',
    })
    class HostComponent {
      faUser = signal(faUser);
    }
  
    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    
    // Check for title accessibility - FontAwesome 7+ sets title attribute on host element,
    // while older versions might create a <title> element inside the SVG
    const titleElement = queryByCss(fixture, 'svg > title');
    const hostTitleAttr = queryByCss(fixture, 'fa-icon').getAttribute('title');
    
    // Either approach provides the same accessibility benefit
    const hasTitle = titleElement !== null || hostTitleAttr === 'User John Smith';
    expect(hasTitle).toBeTruthy();
    
    // If there's a title element, verify its content
    if (titleElement) {
      expect(titleElement.innerHTML).toBe('User John Smith');
    }
  });

  it('should have title attribute, when title input is set using Angular binding syntax', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: ` <fa-icon [icon]="faUser()" [title]="'User John Smith'"></fa-icon> `,
    })
    class HostComponent {
      faUser = signal(faUser);
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'fa-icon').getAttribute('title')).toBe('User John Smith');
  });

  it('should use default icon prefix', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon icon="user"></fa-icon>',
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
      template: '<fa-icon icon="user"></fa-icon>',
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
      template: '<fa-icon icon="user"></fa-icon>',
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
      template: '<fa-icon icon="user"></fa-icon>',
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
      template: '<fa-icon icon="user" [fixedWidth]="fixedWidth()"></fa-icon>',
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
      template: '<fa-icon icon="user" [fixedWidth]="fixedWidth()"></fa-icon>',
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
      template: '<fa-icon icon="user"></fa-icon>',
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
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon icon="circle"></fa-icon>',
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);
    expect(() => fixture.detectChanges()).toThrow(
      new Error('Could not find icon with iconName=circle and prefix=fas in the icon library.'),
    );
  });

  it('should display a fallback icon when specified in the config, and icon attribute is missing', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon [icon]="undefined"></fa-icon>',
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
      template: '<fa-icon [icon]="faUser()"></fa-icon>',
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
      template: '<fa-stack><fa-icon [icon]="faCircle()"></fa-icon></fa-stack>',
    })
    class HostComponent {
      faCircle = signal(faCircle);
    }

    const spy = spyOn(console, 'error');

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(
      'FontAwesome: fa-icon and fa-duotone-icon elements must specify stackItemSize attribute when wrapped into ' +
        'fa-stack. Example: <fa-icon stackItemSize="2x"></fa-icon>.',
    );
  });

  it('should be able to set predefined rotate as a number', () => {
    @Component({
      selector: 'fa-host',
      standalone: false,
      template: '<fa-icon icon="user" [rotate]="90"></fa-icon>',
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
      template: '<fa-icon icon="user" rotate="90"></fa-icon>',
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
      template: '<fa-icon icon="user" rotate="45deg"></fa-icon>',
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
