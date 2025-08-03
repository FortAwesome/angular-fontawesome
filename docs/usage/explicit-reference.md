# Explicit reference approach

The explicit reference approach involves explicitly importing the icon definition from the npm package, assigning it to the component's property and then binding this property to the `icon` input of the `fa-icon` component.

While this approach is more verbose than the [icon library](./icon-library.md) approach, it makes it much easier to figure out where or whether the given icon is used. For example, with Find usages feature of the IDE. Another benefit of this approach is that it will produce a compile-time error if an icon is missing.

`src/app/app.component.html`

```html
<div style="text-align:center">
  <fa-icon [icon]="faCoffee" />
</div>
```

`src/app/app.component.ts`

1. Import `{ FontAwesomeModule } from '@fortawesome/angular-fontawesome'`.
1. Add `FontAwesomeModule` to `imports`.

   Note that you need to add `FontAwesomeModule` to the `imports` of every module/component where you want to use `fa-icon` component, because of Angular module encapsulation. You can read more about it in [this blog post](https://indepth.dev/posts/1056/avoiding-common-confusions-with-modules-in-angular#module-encapsulation).
1. Import an icon like `{ faCoffee } from '@fortawesome/free-solid-svg-icons'`.
1. Assign icon to the component property using `faCoffee = faCoffee`.

```typescript
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  imports: [FontAwesomeModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  faCoffee = faCoffee;
}
```

You can also use a [Font Awesome Kit](https://fontawesome.com/kits). With a Kit
you can upload your own icons or pick only the icons you'd like to use.

[Find out more about Kits and how you can use them in JavaScript projects](https://fontawesome.com/docs/web/setup/use-kit)

```typescript
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@awesome.me/kit-KIT_CODE/icons/classic/solid'; // KIT_CODE is a unique identifier for you Pro Kit

@Component({
  selector: 'app-root',
  imports: [FontAwesomeModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  faCoffee = faCoffee;
}
```

Kit packages use a [subpath exports](https://nodejs.org/api/packages.html#subpath-exports) feature of Node.js. If you
get an error like `Cannot find module '@awesome.me/kit-KIT_CODE/icons/classic/solid' or its corresponding type 
declartions.`, you may need to update your `tsconfig.json` to set `moduleResolution` to `bundler`:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

