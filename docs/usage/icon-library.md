# Using the Icon Library

The icon library provides convenient usage in your templates but you have to manage the icons separate from your components. This has long-term maintenance implications, specifically, this means that if someone accidentally removes the icon from your icon library the component that uses it will break.

Icons can be registered once in `app.module` with `library.add()`. Icons added to the library will be available to any other component whose parent module also imports `FontAwesomeModule`. This eliminates the need to redefine or explicitly import icons into individual components across multiple modules, lazy-loaded or not.

`src/app/app.component.html`

```html
<div style="text-align:center">
  <!-- simple name only that assumes the 'fas' prefix -->
  <fa-icon icon="coffee"></fa-icon>
  <!-- ['fas', 'coffee'] is an array that indicates the [prefix, iconName] -->
  <fa-icon [icon]="['fas', 'coffee']"></fa-icon>
</div>
```

`src/app/app.module.ts`

1. Import `{ FontAwesomeModule } from '@fortawesome/angular-fontawesome'`
1. Add `FontAwesomeModule` to `imports`
1. Import `{ library } from '@fortawesome/fontawesome-svg-core'`
1. Import an icon like `{ faCoffee } from '@fortawesome/free-solid-svg-icons'`
1. Add to the library with `library.add(faCoffee)`

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faCoffee);
  }
}
```

You can also import entire icon styles. But be careful! This way of importing icons does not support tree-shaking, so all icons from the imported package will end up in your bundle.

```javascript
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far);
```
