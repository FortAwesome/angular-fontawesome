# Explicit reference approach

The explicit reference approach involves explicitly importing the icon definition from the npm package, assigning it to the component's property and then binding this property to the `icon` input of the `fa-icon` component.

While this approach is more verbose than the [icon library](./icon-library.md) approach, it makes it much easier to figure out where or whether the given icon is used. For example, with Find usages feature of the IDE. Another benefit of this approach is that it will produce a compile-time error if an icon is missing.

`src/app/app.component.html`

```html
<div style="text-align:center">
  <fa-icon [icon]="faCoffee"></fa-icon>
</div>
```

`src/app/app.component.ts`

1. Import an icon like `{ faCoffee } from '@fortawesome/free-solid-svg-icons'`.
1. Assign icon to the component property using `faCoffee = faCoffee`.

```typescript
import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  faCoffee = faCoffee;
}
```

`src/app/app.module.ts`

1. Import `{ FontAwesomeModule } from '@fortawesome/angular-fontawesome'`.
1. Add `FontAwesomeModule` to `imports`.

   Note that you need to add `FontAwesomeModule` to the `imports` of every module where you want to use `fa-icon` component, because of Angular module encapsulation. You can read more about it in [this blog post](https://indepth.dev/posts/1056/avoiding-common-confusions-with-modules-in-angular#module-encapsulation).

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
export class AppModule { }
```
