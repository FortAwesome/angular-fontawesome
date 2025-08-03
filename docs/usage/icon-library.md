# Icon library approach

The icon library approach provides convenient usage in the templates, but the icons have to be managed separately from the components. This has long-term maintenance implications, specifically, this means that there is no easy way to tell if any given icon is in use. Therefore, if someone accidentally removes an icon from the icon library, the application will build just fine, but the component that needs this icon will break at runtime.

Icons should be registered only once in the `AppComponent`'s constructor using `FaIconLibrary.addIcons()` or `FaIconLibrary.addIconPacks()` calls. Icons added to the library will be available everywhere in the application and can be referenced just by their name. This eliminates the need to explicitly import icons and assign them to a property of every individual component to be able to use them in the template as with the [explicit reference](./explicit-reference.md) approach.

`src/app/app.component.html`

```html
<!-- simple name only that assumes the default prefix -->
<fa-icon icon="coffee" />
<!-- ['fas', 'coffee'] is an array that indicates the [prefix, iconName] -->
<fa-icon [icon]="['fas', 'coffee']" />
```

`src/app/app.component.ts`

1. Import `{ FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome'`.
1. Add `FontAwesomeModule` to `imports`.

   Note that you need to add `FontAwesomeModule` to the `imports` of every module/component where you want to use `fa-icon` component, because of Angular module encapsulation. You can read more about it in [this blog post](https://indepth.dev/posts/1056/avoiding-common-confusions-with-modules-in-angular#module-encapsulation).
1. Inject `FaIconLibrary` into constructor of the `AppComponent`.
1. Import an icon like `{ faCoffee } from '@fortawesome/free-solid-svg-icons'`.
1. Add icon to the library with `library.addIcons(faCoffee)`.

```typescript
import { Component } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  imports: [FontAwesomeModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faCoffee);
  }
}
```

You can also import entire icon styles. But be careful! This way of importing icons does not support tree-shaking, so all icons from the imported package will end up in the bundle.

```typescript
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

export class AppComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
```

A better way can be to use a [Font Awesome Kit](https://fontawesome.com/kits) to only include the icons you choose. You can even upload your own icons.

[Find out more about Kits and how you can use them in JavaScript projects](https://fontawesome.com/docs/web/setup/use-kit)

_In these examples, you would replace "KIT_CODE" with the unique identifier for your Pro Kit_

```typescript
import { Component } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { all } from '@awesome.me/kit-KIT_CODE/icons';

@Component({
  selector: 'app-root',
  imports: [FontAwesomeModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(...all);
  }
}
```

Kit packages use a [subpath exports](https://nodejs.org/api/packages.html#subpath-exports) feature of Node.js. If you
get an error like `Cannot find module '@awesome.me/kit-KIT_CODE/icons' or its corresponding type declartions.`, you may
need to update your `tsconfig.json` to set `moduleResolution` to `bundler`: 

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
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

The fixed width class, `fa-fw`, can be applied globally by injecting the `FaConfig` and modifying the `fixedWidth` property.

```ts
import { FaConfig } from '@fortawesome/angular-fontawesome';

export class AppComponent {
  constructor(faConfig: FaConfig) {
    faConfig.fixedWidth = true;
  }
}
```
