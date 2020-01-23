import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faMobile, faUser } from '@fortawesome/free-solid-svg-icons';
import { faDummy, initTest, queryByCss } from '../../testing/helpers';
import { FaConfig } from '../config';

describe('FaLayersComponent', () => {
  it('should render layers icon', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-layers>
          <fa-icon [icon]="faUser"></fa-icon>
          <fa-icon [icon]="faMobile"></fa-icon>
          <fa-layers-text [content]="'User with mobile'" [styles]="{ color: 'Tomato' }"></fa-layers-text>
        </fa-layers>
      `,
    })
    class HostComponent {
      faUser = faUser;
      faMobile = faMobile;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
  });

  it('should include size class', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-layers size="2x">
          <fa-icon [icon]="faUser"></fa-icon>
          <fa-icon [icon]="faMobile"></fa-icon>
          <fa-layers-text [content]="'User with mobile'" [styles]="{ color: 'Tomato' }"></fa-layers-text>
        </fa-layers>
      `,
    })
    class HostComponent {
      faUser = faUser;
      faMobile = faMobile;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-2x')).toBeTruthy();
  });

  it('should include fixed width when set explicitly', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-layers [fixedWidth]="true"></fa-layers>',
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);
    const config = TestBed.inject(FaConfig);
    config.fixedWidth = false;
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-fw')).toBeTruthy();
  });

  it('should include fixed width when set with global config', () => {
    @Component({
      selector: 'fa-host',
      template: '<fa-layers></fa-layers>',
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);
    const config = TestBed.inject(FaConfig);
    config.fixedWidth = true;
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-fw')).toBeTruthy();
  });

  it('should not include fixed width when set explicitly', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-layers [fixedWidth]="false">
          <fa-icon [icon]="faUser"></fa-icon>
          <fa-icon [icon]="faMobile"></fa-icon>
          <fa-layers-text [content]="'User with mobile'" [styles]="{ color: 'Tomato' }"></fa-layers-text>
        </fa-layers>
      `,
    })
    class HostComponent {
      faUser = faUser;
      faMobile = faMobile;
    }

    const fixture = initTest(HostComponent);
    const config = TestBed.inject(FaConfig);
    config.fixedWidth = true;
    fixture.detectChanges();
    expect(queryByCss(fixture, 'fa-layers.fa-fw')).toBeFalsy();
  });

  it('should allow setting custom class on the host element', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-layers class="custom-class" [fixedWidth]="fixedWidth" [size]="size"></fa-layers>
        <fa-layers [class.custom-class]="true" [fixedWidth]="fixedWidth" [size]="size"></fa-layers>
        <fa-layers [ngClass]="{ 'custom-class': true }" [fixedWidth]="fixedWidth" [size]="size"></fa-layers>
        <fa-layers [fixedWidth]="fixedWidth" [size]="size" class="custom-class"></fa-layers>
        <fa-layers [fixedWidth]="fixedWidth" [size]="size" [class.custom-class]="true"></fa-layers>
        <fa-layers [fixedWidth]="fixedWidth" [size]="size" [ngClass]="{ 'custom-class': true }"></fa-layers>
      `,
    })
    class HostComponent {
      fixedWidth = true;
      size: SizeProp = '4x';
    }

    const fixture = initTest(HostComponent);

    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('fa-layers'));
    for (const element of elements) {
      expect(element.nativeElement.className).toContain('custom-class');
      expect(element.nativeElement.className).toContain('fa-layers');
      expect(element.nativeElement.className).toContain('fa-fw');
      expect(element.nativeElement.className).toContain('fa-4x');
    }
  });

  it('should support duotone icons', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-layers>
          <fa-duotone-icon [icon]="faDummy"></fa-duotone-icon>
          <fa-layers-text [content]="'Dummy'" [styles]="{ color: 'Tomato' }"></fa-layers-text>
        </fa-layers>
      `,
    })
    class HostComponent {
      faDummy = faDummy;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'fa-duotone-icon')).toBeTruthy();
  });
});
