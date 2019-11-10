# Using other styles

Font Awesome icons are separated into styles, which are shipped in separate packages to meet different needs and to reduce individual packages size. To use an icon you'll need to install a package which contains it.

The general workflow of adding a new icon:

1. Visit [fontawesome.com/icons](https://fontawesome.com/icons) to browse icons.
1. Open the icon page to find out which style it belongs to.
1. Install a package containing the icon if not already installed (use style name from the previous step and see full package names below).
1. Import the icon from the installed package and use it in your application using either [icon library](./icon-library.md) or [explicit references](./explicit-reference.md) approach.

Packages prefixed with `free` are available for everybody, while packages prefixed with `pro` require a [Font Awesome Pro](https://fontawesome.com/pro) subscription and require [additional configuration](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers#installing-pro).

## Solid Icons

```bash
$ yarn add @fortawesome/free-solid-svg-icons
# or
$ yarn add @fortawesome/pro-solid-svg-icons
```

```javascript
import { faClock } from '@fortawesome/free-solid-svg-icons';
```

## Brand Icons

```
$ yarn add @fortawesome/free-brands-svg-icons
```

```javascript
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
```

## Regular Icons

```bash
$ yarn add @fortawesome/free-regular-svg-icons
# or
$ yarn add @fortawesome/pro-regular-svg-icons
```

```javascript
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
```

## Pro-only Light Icons

```bash
$ yarn add @fortawesome/pro-light-svg-icons
```

```javascript
import { faArrowAltRight } from '@fortawesome/pro-light-svg-icons';
```

## Pro-only Duotone Icons

```bash
$ yarn add @fortawesome/pro-duotone-svg-icons
```

```javascript
import { faCamera } from '@fortawesome/pro-duotone-svg-icons';
````

## Same Icon from Multiple Styles

To use the same icon from the multiple styles you'll need to use import aliases to avoid the name conflicts:

```javascript
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library for convenient access in other components
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add multiple icons to the library
    library.addIcons(fasStar, farStar);
  }
}
```

```html
<fa-icon [icon]="['fas', 'star']"></fa-icon>
<fa-icon [icon]="['far', 'star']"></fa-icon>
```
