import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeTestingModule } from 'testing/src/public_api';

@Component({
  selector: 'fa-host',
  template: '<fa-icon icon="someicon"></fa-icon>',
})
class HostComponent {}

describe('Using the `FontAwesomeTestingModule', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeTestingModule],
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
