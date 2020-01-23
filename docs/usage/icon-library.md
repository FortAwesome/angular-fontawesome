# Using the Icon Library

The icon library provides convenient usage in your templates but you have to manage the icons separate from your components. This has long-term maintenance implications, specifically, this means that if someone accidentally removes the icon from your icon library the component that uses it will break.

Icons can be registered once in `app.module` with `FaIconLibrary.addIcons()` or `FaIconLibrary.addIconPacks()`. Icons added to the library will be available to any other components whose parent module also imports `FontAwesomeModule`. This eliminates the need to redefine or explicitly import icons into individual components across multiple modules, lazy-loaded or not.

`src/app/app.component.html`

```html
<!-- simple name only that assumes the default prefix -->
<fa-icon icon="coffee"></fa-icon>
<!-- ['fas', 'coffee'] is an array that indicates the [prefix, iconName] -->
<fa-icon [icon]="['fas', 'coffee']"></fa-icon>
```

`src/app/app.module.ts`

1. Import `{ FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome'`
1. Add `FontAwesomeModule` to `imports`
1. Inject `FaIconLibrary` into constructor of the module.
1. Import an icon like `{ faCoffee } from '@fortawesome/free-solid-svg-icons'`
1. Add icon to the library with `library.addIcons(faCoffee)`

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FontAwesomeModule],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faCoffee);
  }
}
```

You can also import entire icon styles. But be careful! This way of importing icons does not support tree-shaking, so all icons from the imported package will end up in the bundle.

```typescript
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
```

## Changing the default prefix

The default prefix, `fas`, can be adjusted by injecting the `FaConfig` and modifying the `defaultPrefix` property.

```typescript
import { FaConfig } from '@fortawesome/angular-fontawesome';

export class AppComponent {
  constructor(faConfig: FaConfig) {
    faConfig.defaultPrefix = 'far';
  }
}
```

## Apply fixed width by default

The fixed width class, `fa-fw`, can be applied globally by injecting the `FaConfig` and modyfing the `fixedWidth` property.

```ts
import { FaConfig } from '@fortawesome/angular-fontawesome';

export class AppComponent {
  constructor(faConfig: FaConfig) {
    faConfig.fixedWidth = true;
  }
}
```
