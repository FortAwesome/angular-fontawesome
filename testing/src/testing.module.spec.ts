import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ADD_ICON_MESSAGE } from './icon/mock-icon-library.service';
import { FontAwesomeTestingModule } from './testing.module';

@Component({
  selector: 'fa-host',
  template: '<fa-icon icon="someicon"></fa-icon>',
})
class HostComponent {}

describe('Using the `FontAwesomeTestingModule', () => {
  describe('Providing no configuration', () => {
    // This describe block asserts that the behaviour of versions <= 0.14.1 is maintained

    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FontAwesomeTestingModule],
        declarations: [HostComponent],
      });

      fixture = TestBed.createComponent(HostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should allow you to import the module without errors', () => {
      expect(component).toBeTruthy();
    });

    it('should throw on attempt to add an icon to the mocked icon library', () => {
      const service = TestBed.inject(FaIconLibrary);
      expect(() => service.addIcons(faUser)).toThrow(new Error(ADD_ICON_MESSAGE));
    });

    it('should throw on attempt to add an icon pack to the mocked icon library', () => {
      const service = TestBed.inject(FaIconLibrary);
      expect(() => service.addIcons(faUser)).toThrow(new Error(ADD_ICON_MESSAGE));
    });
  });

  describe('Providing an empty configuration object', () => {
    // This describe block asserts that a partial configuration object
    // is correctly filled up to the ‘full’ internal object.
    // The used configuration should mimic the default values for ‘no configuration’.

    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FontAwesomeTestingModule.forRoot({})],
        declarations: [HostComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(HostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should allow you to import the module without errors', () => {
      expect(component).toBeTruthy();
    });

    it('should throw on attempt to add an icon to the mocked icon library', () => {
      const service = TestBed.inject(FaIconLibrary);
      expect(() => service.addIcons(faUser)).toThrow(new Error(ADD_ICON_MESSAGE));
    });

    it('should throw on attempt to add an icon pack to the mocked icon library', () => {
      const service = TestBed.inject(FaIconLibrary);
      expect(() => service.addIcons(faUser)).toThrow(new Error(ADD_ICON_MESSAGE));
    });
  });

  describe('Providing {addIcons: "throwError"}', () => {
    // This describe block asserts that feature request
    // https://github.com/FortAwesome/angular-fontawesome/issues/440
    // is implemented correctly.

    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FontAwesomeTestingModule.forRoot({ whenAddingIcons: 'throwError' })],
        declarations: [HostComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(HostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should allow you to import the module without errors', () => {
      expect(component).toBeTruthy();
    });

    it('should throw on attempt to add an icon to the mocked icon library', () => {
      const service = TestBed.inject(FaIconLibrary);
      expect(() => service.addIcons(faUser)).toThrow(new Error('Attempt to add an icon to the MockFaIconLibrary.'));
    });

    it('should throw on attempt to add an icon pack to the mocked icon library', () => {
      const service = TestBed.inject(FaIconLibrary);
      expect(() => service.addIcons(faUser)).toThrow(new Error('Attempt to add an icon to the MockFaIconLibrary.'));
    });
  });

  describe('Providing {addIcons: "logWarning"}', () => {
    // This describe block asserts that feature request
    // https://github.com/FortAwesome/angular-fontawesome/issues/440
    // is implemented correctly.

    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FontAwesomeTestingModule.forRoot({ whenAddingIcons: 'logWarning' })],
        declarations: [HostComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(HostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should allow you to import the module without errors', () => {
      expect(component).toBeTruthy();
    });

    it('should call console.warn on attempt to add an icon to the mocked icon library', () => {
      const service = TestBed.inject(FaIconLibrary);
      spyOn(console, 'warn');
      expect(() => service.addIcons(faUser)).not.toThrow();
      expect(console.warn).toHaveBeenCalledOnceWith(ADD_ICON_MESSAGE);
    });

    it('should call console.warn on attempt to add an icon pack to the mocked icon library', () => {
      const service = TestBed.inject(FaIconLibrary);
      spyOn(console, 'warn');
      expect(() => service.addIcons(faUser)).not.toThrow();
      expect(console.warn).toHaveBeenCalledOnceWith(ADD_ICON_MESSAGE);
    });
  });

  describe('Providing {addIcons: "noop"}', () => {
    // This describe block asserts that feature request
    // https://github.com/FortAwesome/angular-fontawesome/issues/440
    // is implemented correctly.

    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FontAwesomeTestingModule.forRoot({ whenAddingIcons: 'noop' })],
        declarations: [HostComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(HostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should allow you to import the module without errors', () => {
      expect(component).toBeTruthy();
    });

    it('should ignore attempts to add an icon to the mocked icon library', () => {
      const service = TestBed.inject(FaIconLibrary);
      spyOn(console, 'warn');
      expect(() => service.addIcons(faUser)).not.toThrow();
      expect(console.warn).not.toHaveBeenCalledOnceWith(ADD_ICON_MESSAGE);
    });

    it('should ignore attempts to add an icon pack to the mocked icon library', () => {
      const service = TestBed.inject(FaIconLibrary);
      spyOn(console, 'warn');
      expect(() => service.addIcons(faUser)).not.toThrow();
      expect(console.warn).not.toHaveBeenCalledOnceWith(ADD_ICON_MESSAGE);
    });
  });
});
