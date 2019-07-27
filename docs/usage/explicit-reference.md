# Explicit reference

One of the methodologies of using the `angular-fontawesome` library is "Explicit Reference." This involves explicity importing the typescript constants from the npm packages, and setting them directly in the component. This is not as convenient as using the [icon library](./icon-library.md) method but if you believe "explicit is better than implicit" then this method is for you.

`src/app/app.component.html`

```html
<div style="text-align:center">
  <fa-icon [icon]="faCoffee"></fa-icon>
</div>
```

`src/app/app.component.ts`

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

1. Import `{ FontAwesomeModule } from '@fortawesome/angular-fontawesome'`
1. Add `FontAwesomeModule` to `imports`

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
