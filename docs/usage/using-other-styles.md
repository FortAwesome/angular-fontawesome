# Using other styles

## Add more styles or Pro icons
Brands are separated into their own style and for customers upgrading from version 4 to 5 we have a limited number of Regular icons available.

If you are a [Font Awesome Pro](https://fontawesome.com/pro) subscriber you can install Pro packages.

> NOTE: Using the Pro packages requires [additional configuration](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers).

**Visit [fontawesome.com/icons](https://fontawesome.com/icons) to search for free and Pro icons**

## Solid Icons

```bash
$ yarn add @fortawesome/free-solid-svg-icons
$ yarn add @fortawesome/pro-solid-svg-icons
```

```javascript
import { faClock } from '@fortawesome/free-solid-svg-icons';

// Add an icon to the library for convenient access in other components
library.add(faClock);
```

```html
<fa-icon [icon]="['fas', 'clock']"></fa-icon>
```

## Brand Icons

```
$ yarn add @fortawesome/free-brands-svg-icons
$ yarn add @fortawesome/pro-brands-svg-icons
```

```javascript
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

// Add an icon to the library for convenient access in other components
library.add(faTwitter);
```

```html
<fa-icon [icon]="['fab', 'twitter']"></fa-icon>
```

## Regular Icons

```bash
$ yarn add @fortawesome/free-regular-svg-icons
$ yarn add @fortawesome/pro-regular-svg-icons
```

```javascript
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

// Add an icon to the library for convenient access in other components
library.add(faCalendar);
```

```html
<fa-icon [icon]="['far', 'calendar']"></fa-icon>
```

## Pro-only Light Icons

```bash
$ yarn add @fortawesome/pro-light-svg-icons
```

```javascript
import { faArrowAltRight } from '@fortawesome/pro-light-svg-icons';

// Add an icon to the library for convenient access in other components
library.add(faArrowAltRight);
```

```html
<fa-icon [icon]="['fal', 'calendar']"></fa-icon>
```

## One Icon from Multiple Styles

```javascript
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library for convenient access in other components
library.add(fasStar, farStar);
```

```html
<fa-icon [icon]="['fas', 'star']"></fa-icon>
<fa-icon [icon]="['far', 'star']"></fa-icon>
```