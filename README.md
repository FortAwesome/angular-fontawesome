# angular-fontawesome

[![npm](https://img.shields.io/npm/v/@fortawesome/angular-fontawesome.svg?style=flat-square)](https://www.npmjs.com/package/@fortawesome/angular-fontawesome)

> Font Awesome 5 Angular component using SVG with JS

Built with [Angular Librarian] and conforming to the [Angular Package Format].

[Angular Librarian]: https://github.com/gonzofish/angular-librarian
[Angular Package Format]: https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit?usp=sharing

Hey there! We're glad you're here...

#### Upgrading Font Awesome?

If you've used Font Awesome in the past (version 4 or older) there are some
things that you should learn before you dive in.

> https://fontawesome.com/how-to-use/upgrading-from-4

#### Get started

This package is for integrating with Angular (not AngularJS). If you aren't
using Angular then it's not going to help you. Head over to our "Get Started"
page for some guidance.

> https://fontawesome.com/get-started

#### Learn about our new SVG implementation

This package, under the hood, uses SVG with JS and the
`@fortawesome/fontawesome-svg-core` library. This implementation differs
drastically from the web fonts implementation that was used in version 4 and
older of Font Awesome. You might head over there to learn about how it works.

> https://fontawesome.com/how-to-use/svg-with-js

#### Going from an older pre-release version?

See [UPGRADING.md](./UPGRADING.md).

You might also be interested in the larger umbrella project [UPGRADING.md](https://github.com/FortAwesome/Font-Awesome/blob/master/UPGRADING.md)

## Installation

```
$ yarn add @fortawesome/fontawesome-svg-core
$ yarn add @fortawesome/free-solid-svg-icons
$ yarn add @fortawesome/angular-fontawesome
```

## Add more styles or Pro icons

Brands are separated into their own style and for customers upgrading from
version 4 to 5 we have a limited number of Regular icons available.

**Visit [fontawesome.com/icons](https://fontawesome.com/icons) to search for free and Pro icons**

```
$ yarn add @fortawesome/free-brands-svg-icons
$ yarn add @fortawesome/free-regular-svg-icons
```

If you are a [Font Awesome Pro](https://fontawesome.com/pro) subscriber you can install Pro packages.

```
$ yarn add @fortawesome/pro-solid-svg-icons
$ yarn add @fortawesome/pro-regular-svg-icons
$ yarn add @fortawesome/pro-light-svg-icons
```

Using the Pro packages requires [additional configuration](https://fontawesome.com/how-to-use/js-component-packages).

## Usage

These examples are based on a freshly created project with [Angular CLI].

[Angular CLI]: https://cli.angular.io

### Explicit reference

Not as convenient as using the library but if you believe "explicit is better than
implicit" then this method is for you.

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

### Using the Icon Library

The icon library provides convenient usage in your templates but you have to manage
the icons separate from your components. This means that if someone
accidentally removes the icon from the icon library your component which uses it could break.

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

// Add an icon to the library for convenient access in other components
library.add(faCoffee);

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

You can also import entire icon styles. But be careful! Whatever you import
 may end up bloating your final bundle with icons you're not using.

```javascript
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far);
```

### Using other styles

Adding a brand icon

```javascript
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

// Add an icon to the library for convenient access in other components
library.add(faTwitter);
```

```html
<fa-icon [icon]="['fab', 'twitter']"></fa-icon>
```

Adding an icon from the Regular style:

```javascript
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

// Add an icon to the library for convenient access in other components
library.add(faCalendar);
```

```html
<fa-icon [icon]="['fas', 'calendar']"></fa-icon>
```

Adding an icon from the Pro-only Light style:

```javascript
import { faArrowAltRight } from '@fortawesome/pro-light-svg-icons';

// Add an icon to the library for convenient access in other components
library.add(faArrowAltRight);
```

```html
<fa-icon [icon]="['fal', 'calendar']"></fa-icon>
```

## Features

The following features are available as [part of Font Awesome](https://fontawesome.com/how-to-use/svg-with-js).

### Basic

Spin and pulse animation:

```html
<fa-icon [icon]="['fas', 'spinner']" [spin]="true"></fa-icon>
<fa-icon [icon]="['fas', 'spinner']" [pulse]="true"></fa-icon>
```

Fixed width:

```html
<fa-icon [icon]="['fas', 'coffee']" [fixedWidth]="true"></fa-icon>
```

Border:

```html
<fa-icon [icon]="['fas', 'coffee']" [border]="true"></fa-icon>
```

Flip horizontally, vertically, or both:

```html
<fa-icon [icon]="['fas', 'coffee']" flip="horizontal"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" flip="vertical"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" flip="both"></fa-icon>
```

Size:

```html
<fa-icon [icon]="['fas', 'coffee']" size="xs"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" size="lg"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" size="6x"></fa-icon>
```

Rotate:

```html
<fa-icon [icon]="['fas', 'coffee']" rotate="90"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" rotate="180"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" rotate="270"></fa-icon>
```

Pull left or right:

```html
<fa-icon [icon]="['fas', 'coffee']" pull="left"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" pull="right"></fa-icon>
```

### Advanced Usage

With Mask and Transform:


```html
<fa-icon [icon]="['fas', 'coffee']" transform="shrink-9 right-4" [mask]="['fas', 'square']"></fa-icon>
```

Spin animation with click toggle:

```html
<fa-icon [icon]="['fas', 'sync']" [spin]="isSyncAnimated" (click)="isSyncAnimated=!isSyncAnimated"></fa-icon>
```

Transform within binding:

```html
<fa-icon [icon]="['fas', 'magic']" transform="rotate-{{magicLevel}}"></fa-icon>
<input type='range' [value]="magicLevel" (input)="magicLevel=$event.target.value"/>
```
(Slide input range to "turn up the magic")

Layers:

```html
<fa-layers class="fa-fw">
  <fa-icon [icon]="['fas', 'square']"></fa-icon>
  <fa-icon [inverse]="true" [icon]="['fas', 'spinner']" transform="shrink-6"></fa-icon>
</fa-layers>
```

Layers text:

```html
<fa-layers class="fa-fw">
  <fa-icon [icon]="['fas', 'square']"></fa-icon>
  <fa-layers-text content="Yo" style="color: white;" transform="shrink-4"></fa-layers-text>
</fa-layers>
```

Layers counters:

```html
<fa-layers class="fa-fw">
  <fa-icon [icon]="['fas', 'envelope']"></fa-icon>
  <fa-layers-counter content="99+"></fa-layers-counter>
</fa-layers>
```

## Examples

Found in the `examples` directory.

Start the Webpack dev server using:

```
$ yarn start
```

## Tree Shaking

Tree shaking—automatically eliminating unused icons from the final bundle—Just Works<sup>TM</sup>.

## How to Help

1. Write more tests like those in `icon.component.spec.ts` to increase our test
   coverage and submit pull requests.

2. If you are an experienced Angular developer, after experimenting with this
   component, provide feedback about what refinements might help it feel more
   like an "Angular" way of doing things. Open a new issue with each distinct
   recommendation, or submit a pull request with your suggested revisions.
