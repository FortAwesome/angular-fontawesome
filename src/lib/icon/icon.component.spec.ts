import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { initTest, queryByCss } from '../../testing/helpers';
import { FaConfig } from '../config';
import { FaIconComponent } from './icon.component';

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
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
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
    expect(queryByCss(fixture, 'svg').classList.contains('fa-spin')).toBeFalsy();

    fixture.componentInstance.isAnimated = true;
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').classList.contains('fa-spin')).toBeTruthy();
  });

  it('should be able to create component dynamically', () => {
    @Component({
      selector: 'fa-host',
      template: '<ng-container #host></ng-container>'
    })
    class HostComponent {
      @ViewChild('host', {static: true, read: ViewContainerRef}) container: ViewContainerRef;

      constructor(private cfr: ComponentFactoryResolver) {
      }

      createIcon() {
        const factory = this.cfr.resolveComponentFactory(FaIconComponent);
        const componentRef = this.container.createComponent(factory);
        componentRef.instance.icon = faUser;
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

  it('should be able to update icon programmatically', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-icon [icon]="faUser"></fa-icon>'
    })
    class HostComponent {
      faUser = faUser;

      @ViewChild(FaIconComponent, {static: true}) iconComponent: FaIconComponent;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').classList.contains('fa-spin')).toBeFalsy();

    fixture.componentInstance.iconComponent.spin = true;
    fixture.componentInstance.iconComponent.render();
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').classList.contains('fa-spin')).toBeTruthy();
  });

  it('should be possible to customize `role` attribute of the rendered SVG icon', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-icon [icon]="faUser" a11yRole="presentation"></fa-icon>'
    })
    class HostComponent {
      faUser = faUser;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').getAttribute('role')).toBe('presentation');
  });

  it('should show a warning when icon attribute is missing', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-icon [icon]="undefined"></fa-icon>'
    })
    class HostComponent {
    }

    const spy = spyOn(console, 'error');

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg > path')).toBeFalsy();
    expect(spy).toHaveBeenCalledWith(
      'FontAwesome: Property `icon` is required for `fa-icon`/`fa-duotone-icon` components. ' +
      'This warning will become a hard error in 0.6.0.'
    );
  });

  it('should work with AsyncPipe and default value', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-icon [icon]="icon | async"></fa-icon>'
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

  it('should render a <title> element', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-icon [icon]="faUser" title="User John Smith"></fa-icon>'
    })
    class HostComponent {
      faUser = faUser;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg > title')).toBeTruthy();
    expect(queryByCss(fixture, 'svg > title').innerHTML).toBe('User John Smith');
  });

  it('should have title attribute, when title input is set using Angular binding syntax', () => {
    @Component({
      selector: 'fa-host',
      template: `
          <fa-icon [icon]="faUser" [title]="'User John Smith'"></fa-icon>`
    })
    class HostComponent {
      faUser = faUser;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'fa-icon').getAttribute('title')).toBe('User John Smith');
  });

  it('should use default icon prefix', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-icon icon="user"></fa-icon>'
    })
    class HostComponent {
      constructor() {
        library.add(faUser, faUserRegular);
      }
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').getAttribute('data-prefix')).toEqual('fas');
  });

  it('should be able to override default icon prefix', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-icon icon="user"></fa-icon>'
    })
    class HostComponent {
      constructor() {
        library.add(faUser, faUserRegular);
      }
    }

    const fixture = initTest(HostComponent);
    const config = TestBed.get(FaConfig);
    config.defaultPrefix = 'far';
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg').getAttribute('data-prefix')).toEqual('far');
  });
});
