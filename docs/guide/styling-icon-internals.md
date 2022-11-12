# Styling icon internals

**DISCLAIMER:** Styling icon internals is not recommended as it relies on the component's implementation details and may silently break after any library update.

For the majority of the cases, styling the icon with regular `style` and `class` properties as shown in [Custom styles](../usage/features.md#custom-styles) should be used. However, sometimes one has to attach style to one of the internal elements of the component. To achieve this, one would need to overcome the Angular [view encapsulation](https://angular.io/guide/view-encapsulation). This guide explains how to do that.

## Use global styles

As global styles are not subject to the view encapsulation, one can add styles for the `fa-icon` internals to the global `styles.css` and use it everywhere in the application.

```css
/* styles.css */
fa-icon.fancy svg path {
  fill: #ffffff;
  stroke: #ff0000;
  stroke-width: 10;
}
```

```angular2html
<!-- app.component.html -->
<fa-icon icon="user" class="fancy"></fa-icon>
```

## Use `::ng-deep` pseudo-class selector

Another options is to use `:ng-deep` pseudo-class selector. This has the benefit that styles are local to the component and won't accidentally affect `fa-icon` usage in other components of the application.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<fa-icon icon="user" class="fancy"></fa-icon>',
  styles: [`
    fa-icon.fancy ::ng-deep svg path {
      fill: #ffffff;
      stroke: #ff0000;
      stroke-width: 10;
    }
  `],
})
export class AppComponent {}
```
