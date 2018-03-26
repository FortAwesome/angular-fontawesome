# Upgrading Guide

See the [CHANGELOG.md](./CHANGELOG.md) for detailed information about what has changed between versions.

This guide is useful to figure out what you need to do between breaking changes.

As always, [submit issues](https://github.com/FortAwesome/angular-fontawesome/issues/new) that you run into with this guide or with these upgrades to us.

## 0.1.0-x to >= 0.1.0-6

### Renamed packages

The following packages have been renamed as part of 5.1.0 of Font Awesome.

_All packages are in the [@fortawesome NPM scope](https://www.npmjs.com/search?q=scope:fortawesome&page=1&ranking=optimal)_

| Old package(1)           | New package            |
|--------------------------|------------------------|
| fontawesome              | fontawesome-svg-core   |
| fontawesome-free-solid   | free-solid-svg-icons   |
| fontawesome-free-regular | free-regular-svg-icons |
| fontawesome-free-brands  | free-brands-svg-icons  |
| fontawesome-pro-solid    | pro-solid-svg-icons    |
| fontawesome-pro-regular  | pro-regular-svg-icons  |
| fontawesome-pro-light    | pro-light-svg-icons    |

(1) Old packages have now been deprecated. They are still available but will only receive high priority patch release fixes.

**You'll need to update your package.json file with the renamed packages and new versions.**

How does your Angular usage change?

~~Old way:~~

```javascript
import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/fontawesome-free-solid';
import { faUser as regularUser } from '@fortawesome/fontawesome-free-regular';
import { library } from '@fortawesome/fontawesome';

@Component({
  selector: 'example-root',
  templateUrl: './example.component.html',
  styleUrls: []
})
export class ExampleComponent {
  faCoffee = faCoffee;
  regularUser = regularUser;
}
```

New way:

```javascript
import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faUser as regularUser } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'example-root',
  templateUrl: './example.component.html',
  styleUrls: []
})
export class ExampleComponent {
  faCoffee = faCoffee;
  regularUser = regularUser;
}
```

### Improved support for tree shaking

Tree shaking is now functional by default and no additional configuration is required to make it work.

The `shakable.es.js` module has been removed and is no longer needed.

If you've previously configured tree shaking by modifying your `tsconfig.json` you can safely remove this.

```javascript
{
  "compilerOptions": {
    "paths": {
      "@fortawesome/fontawesome-free-solid": ["node_modules/@fortawesome/fontawesome-free-solid/shakable.es.js"],
      "@fortawesome/fontawesome-free-brands": ["node_modules/@fortawesome/fontawesome-free-brands/shakable.es.js"]
    }
  }
}
```

**We recommend that you check your bundle size after upgrading an ensure that file sizes are as you would expect.**

### Mixed modes with automatic replacement of `<i>` tags to `<svg>`

If you were previously relying on Font Awesome to replace any `<i>` tags in
your page or app with `<svg>` you'll need to explicitly control that now.

```javascript
import { watch } from '@fortawesome/fontawesome-svg-core'

watch() // This will kick of the replacement of i tags and configure a MutationObserver
```
