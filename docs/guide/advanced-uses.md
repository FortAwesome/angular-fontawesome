# Advanced uses

While `<fa-icon>` component provides a convenient way to render a Font Awesome icon in the Angular app, there are situations where you can't use it. This guide describes such situations and how to use Font Awesome JavaScript API to deal with them.

The Font Awesome JavaScript API is distributed as the [`@fortawesome/fontawesome-svg-core`](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core) package. The [documentation](https://fontawesome.com/docs/apis/javascript/get-started) for the JavaScript API is available on the official website.

## Replace `<i>` tags with icons in the arbitrary HTML

**Problem:** You have an Angular application, but you need to replace `<i>` tags used by the vanilla Font Awesome in the arbitrary markup, which is not part of the Angular templates. This often happens when the custom HTML markup is loaded from the backend and inserted into the page with `innerHTML`.

In this case, markup is not part of the Angular template, and you can't use `<fa-icon>` component outside the Angular template (see [this SO answer](https://stackoverflow.com/a/41089093/1377864) for more details). Because of this limitation, the `angular-fontawesome` library is not really useful.

The first step is to add all icons which need to be replaced to the library used by the `fontawesome-svg-core` package. This should be done early to make sure that icons are in the library by the time you attempt to replace `<i>` tags. For example, you can choose to put the below code in the `main.ts`:

```ts
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

library.add(faCamera)
```

Once icons are added to the library you have two options:

1. When custom markup is inserted into the page in a controlled way, it is better to call [`dom.i2svg()`](https://fontawesome.com/v5.15/how-to-use/javascript-api/methods/dom-i2svg) method once the custom markup has been added to the page. It will replace all `<i>` tags with the icon `<svg>` elements.

   This approach is more performant.
2. When custom markup is inserted into the page in multiple places or by the third-party code (so you can't hook into it), then you can use [`dom.watch()`](https://fontawesome.com/v5.15/how-to-use/javascript-api/methods/dom-watch) method, which will utilize [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to listen to any markup changes and replace `<i>` tags with the icon `<svg>` elements.

   Note that depending on the size of the application, this option may cause performance problems as the dynamic Angular application will trigger a lot of events even when icons don't need to be re-rendered. Also, note that in some situations `MutationObserver` may cause an infinite change detection loop (observed as a frozen application). To prevent this from happening, you should call `dom.watch()` outside of Angular zone by either putting it in the `main.ts` or wrapping it into [`NgZone.runOutsideAngular()`](https://angular.io/api/core/NgZone#runOutsideAngular) call.

## Include icon in the markup passed as a string to a JavaScript library

**Problem:** You have an Angular application where you use some library, which accepts custom markup as a string parameter and injects it somewhere in the DOM (tooltip, Google Maps, etc). You want to include Font Awesome icon in this custom markup and tried to include `<fa-icon>` component, but it didn't work.

Such markup is not part of the Angular template, and you can't use `<fa-icon>` component outside the Angular template (see [this SO answer](https://stackoverflow.com/a/41089093/1377864) for more details). Because of this limitation, the `angular-fontawesome` library is not really useful.

While you can use `dom.i2svg()` or `dom.watch()` calls described in the previous scenario to handle this, it's often an overkill. As you control the markup, you can render icons into SVG strings using [`icon()`](https://fontawesome.com/v5.15/how-to-use/javascript-api/methods/icon) function and concatenate them with the rest of the markup. See the below example.

```ts
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

myTooltipLib({
    content: `<p><b>Hint:</b> You can navigate items with ${icon(faChevronLeft).html.join('')} and ${icon(faChevronRight).html.join('')} buttons.</p>`
})
```
