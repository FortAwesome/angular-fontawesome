# Using other styles

Font Awesome icons are separated into styles, which are shipped in separate packages to meet different needs and to reduce individual packages size. To use an icon you'll need to install a package which contains it.

The general workflow of adding a new icon:

1. Visit [fontawesome.com/icons](https://fontawesome.com/icons) to browse icons.
1. Open the icon page to find out which style it belongs to.
1. Install a package containing the icon if not already installed (use style name from the previous step and see full package names below).
1. Import the icon from the installed package and use it in your application using either [icon library](./icon-library.md) or [explicit references](./explicit-reference.md) approach.

Packages prefixed with `free` are available for everybody, while packages prefixed with `pro` and `sharp` require a [Font Awesome Pro](https://fontawesome.com/plans) subscription and [additional configuration](https://fontawesome.com/docs/web/setup/packages#_1-configure-access).

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

## Pro-only Icons

```bash
npm install --save @fortawesome/free-brands-svg-icons
npm install --save @fortawesome/pro-solid-svg-icons
npm install --save @fortawesome/pro-regular-svg-icons
npm install --save @fortawesome/pro-light-svg-icons
npm install --save @fortawesome/pro-thin-svg-icons
npm install --save @fortawesome/pro-duotone-svg-icons
npm install --save @fortawesome/duotone-regular-svg-icons
npm install --save @fortawesome/duotone-light-svg-icons
npm install --save @fortawesome/duotone-thin-svg-icons
npm install --save @fortawesome/sharp-solid-svg-icons
npm install --save @fortawesome/sharp-regular-svg-icons
npm install --save @fortawesome/sharp-light-svg-icons
npm install --save @fortawesome/sharp-thin-svg-icons
npm install --save @fortawesome/sharp-duotone-solid-svg-icons
npm install --save @fortawesome/sharp-duotone-regular-svg-icons
npm install --save @fortawesome/sharp-duotone-light-svg-icons
npm install --save @fortawesome/sharp-duotone-thin-svg-icons
```

```bash
yarn add @fortawesome/free-brands-svg-icons
yarn add @fortawesome/pro-solid-svg-icons
yarn add @fortawesome/pro-regular-svg-icons
yarn add @fortawesome/pro-light-svg-icons
yarn add @fortawesome/pro-thin-svg-icons
yarn add @fortawesome/pro-duotone-svg-icons
yarn add @fortawesome/duotone-regular-svg-icons
yarn add @fortawesome/duotone-light-svg-icons
yarn add @fortawesome/duotone-thin-svg-icons
yarn add @fortawesome/sharp-solid-svg-icons
yarn add @fortawesome/sharp-regular-svg-icons
yarn add @fortawesome/sharp-light-svg-icons
yarn add @fortawesome/sharp-thin-svg-icons
yarn add @fortawesome/sharp-duotone-solid-svg-icons
yarn add @fortawesome/sharp-duotone-regular-svg-icons
yarn add @fortawesome/sharp-duotone-light-svg-icons
yarn add @fortawesome/sharp-duotone-thin-svg-icons
```

Example using the Light style:

```javascript
import { faArrowAltRight } from '@fortawesome/pro-light-svg-icons';
```

## Pro-only Kit

You can now use your [Font Awesome Kit](https://fontawesome.com/kits) with angular-fontawesome. With a Kit you can upload your own icons or pick only the icons you'd like to use.

[Find out more about Kits and how you can use them in JavaScript projects](https://fontawesome.com/docs/web/setup/use-kit)

_In these examples, you would replace "KIT_CODE" with the unique identifier for your Pro Kit_

```bash
npm install --save @awesome.me/kit-KIT_CODE
# or
yarn add @awesome.me/kit-KIT_CODE
```

```javascript
import { faArrowAltRight } from '@awesome.me/kit-KIT_CODE/icons/classic/solid';
import { faMyIcon } from '@awesome.me/kit-KIT_CODE/icons/kit/custom';
```

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
