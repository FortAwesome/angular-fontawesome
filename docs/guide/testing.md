# Testing

This guide explains how to test components, which use Font Awesome icons.

## Test components using [explicit reference](../usage/explicit-reference.md)

Testing components using explicit reference does not require any special setup. You only need to add `FontAwesomeModule` to the `imports` of the testing module to be able to use `angular-fontawesome` components in the tests.

```typescript
import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-explicit-reference',
  template: '<fa-icon [icon]="faUser"></fa-icon>',
})
export class ExplicitReferenceComponent {
  faUser = faUser;
}
```

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExplicitReferenceComponent } from './explicit-reference.component';

describe('ExplicitReferenceComponent', () => {
  let component: ExplicitReferenceComponent;
  let fixture: ComponentFixture<ExplicitReferenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule], // <--
      declarations: [ExplicitReferenceComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplicitReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

## Test components using [icon library](../usage/icon-library.md)

When it comes to testing components using icon library you'll need to setup the icon library in one way or another otherwise component will throw because of the missing icon definition. The icon library setup is needed because most likely `AppModule` where you normally add icons to the library is not part of the tested component spec and therefore icons added there are not available.

There are several options how to deal with the icon library in the tests:

- (recommended) define a wrapper module for `FontAwesomeModule` to configure an icon library in a single place
- configure regular `FaIconLibrary` in each spec with icons used by the component
- use `FontAwesomeTestingModule`, which will mock `FaIconLibrary` and render stub icons instead of the real ones

### Define a wrapper module for `FontAwesomeModule`

With this approach you would define a new module, which wraps `FontAwesomeModule` and configures an icon library. Then this module can be used instead of `FontAwesomeModule` both in the `AppModule` and test code thus the icon library configuration is shared between application and tests. Below is the example of such wrapper module:

```typescript
import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
class FontAwesomeIconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faUser);
  }
}
```

And here is how it should be used in test code:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-regular-icon-library',
  template: '<fa-icon icon="user"></fa-icon>',
})
export class IconLibraryComponent {}
```

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconLibraryComponent } from './icon-library.component';

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
```

*This approach was [initially suggested by 1FpGLLjZSZMx6k on StackOverflow](https://stackoverflow.com/a/58380192/1377864).*

### Configure regular `FaIconLibrary`

To use this approach you'll need to add `FontAwesomeModule` to the `imports` of the testing module to be able to use `angular-fontawesome` components in the tests and also inject `FaIconLibrary` in `beforeEach` hook and add icons used by the tested component.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-regular-icon-library',
  template: '<fa-icon icon="user"></fa-icon>',
})
export class IconLibraryComponent {}
```

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
```

### Use `FontAwesomeTestingModule` to mock icon library

`FontAwesomeTestingModule` provides a mocked `FaIconLibrary` and renders stub icons instead of the real ones. This approach allows to reduce boilerplate when testing components with a lot of icons. To use this approach you need to import `FontAwesomeTestingModule` instead of the regular `FontAwesomeModule` and don't need to explicitly configure `FaIconLibrary` as in the previous approach.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-regular-icon-library',
  template: '<fa-icon icon="user"></fa-icon>',
})
export class IconLibraryComponent {}
```

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { IconLibraryComponent } from './icon-library.component';

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
```
