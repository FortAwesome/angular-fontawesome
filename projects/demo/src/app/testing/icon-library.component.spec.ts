import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { IconLibraryComponent } from './icon-library.component';

describe('IconLibraryComponent', () => {
  let component: IconLibraryComponent;
  let fixture: ComponentFixture<IconLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule], // <--
      declarations: [IconLibraryComponent],
    });
  });

  beforeEach(() => {
    // Use TestBed.get(FaIconLibrary) if you use Angular < 9.
    const library = TestBed.inject(FaIconLibrary); // <--
    library.addIcons(faUser); // <--

    fixture = TestBed.createComponent(IconLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('IconLibraryComponent', () => {
  let component: IconLibraryComponent;
  let fixture: ComponentFixture<IconLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeTestingModule], // <--
      declarations: [IconLibraryComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
class FontAwesomeIconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faUser);
  }
}

describe('IconLibraryComponent', () => {
  let component: IconLibraryComponent;
  let fixture: ComponentFixture<IconLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeIconsModule], // <--
      declarations: [IconLibraryComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
