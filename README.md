<a href="https://fontawesome.com">
  <img align="right" width="100" height="100" alt="Official Javascript Component" src="https://img.fortawesome.com/349cfdf6/official-javascript-component.svg">
</a>

# angular-fontawesome

[![npm](https://img.shields.io/npm/v/@fortawesome/angular-fontawesome.svg?style=flat-square)](https://www.npmjs.com/package/@fortawesome/angular-fontawesome)

> Font Awesome 5 Angular component using SVG with JS

<!-- toc -->

- [Get started](#get-started)
  * [Upgrading Font Awesome?](#upgrading-font-awesome)
  * [Is this the package for you?](#is-this-the-package-for-you)
  * [Learn about our new SVG implementation](#learn-about-our-new-svg-implementation)
  * [Going from an older pre-release version?](#going-from-an-older-pre-release-version)
- [Installation](#installation)
- [Add more styles or Pro icons](#add-more-styles-or-pro-icons)
- [Usage](#usage)
  * [Explicit reference](#explicit-reference)
  * [Using the Icon Library](#using-the-icon-library)
  * [Using other styles](#using-other-styles)
  * [Changing the default prefix](#changing-the-default-prefix)
- [Features](#features)
  * [Basic](#basic)
  * [Advanced usage](#advanced-usage)
- [Examples](#examples)
- [Tree Shaking](#tree-shaking)
- [How to Help](#how-to-help)
- [Contributors](#contributors)
- [Releasing this project](#releasing-this-project)

<!-- tocstop -->

## Get started

Built with [ng-packagr] and conforming to the [Angular Package Format].

[ng-packagr]: https://github.com/dherges/ng-packagr
[Angular Package Format]: https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit?usp=sharing

Hey there! We're glad you're here...

### Upgrading Font Awesome?

If you've used Font Awesome in the past (version 4 or older) there are some
things that you should learn before you dive in.

> https://fontawesome.com/how-to-use/on-the-web/setup/upgrading-from-version-4

### Is this the package for you?

This package is for integrating with Angular (not AngularJS). If you aren't
using Angular then it's not going to help you. Head over to our "Get Started"
page for some guidance.

> https://fontawesome.com/how-to-use/on-the-web/setup/getting-started

### Learn about our new SVG implementation

This package, under the hood, uses SVG with JS and the
`@fortawesome/fontawesome-svg-core` library. This implementation differs
drastically from the web fonts implementation that was used in version 4 and
older of Font Awesome. You might head over there to learn about how it works.

> https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core

### Going from an older pre-release version?

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

Using the Pro packages requires [additional configuration](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers).

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

Icons can be registered once in `app.module` with `library.add()`. Icons added to the library will be available to any other component whose parent module also imports `FontAwesomeModule`. This eliminates the need to redefine or explicitly import icons into individual components across multiple modules, lazy-loaded or not.

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

The following features are available as part of Font Awesome. Note that the syntax is different from our general web-use documentation.

### Basic

[Size](https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons):

```html
<fa-icon [icon]="['fas', 'coffee']" size="xs"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" size="lg"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" size="6x"></fa-icon>
```

[Fixed width](https://fontawesome.com/how-to-use/on-the-web/styling/fixed-width-icons):

```html
<fa-icon [icon]="['fas', 'coffee']" [fixedWidth]="true"></fa-icon>
```

[Rotate](https://fontawesome.com/how-to-use/on-the-web/styling/rotating-icons):

```html
<fa-icon [icon]="['fas', 'coffee']" rotate="90"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" rotate="180"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" rotate="270"></fa-icon>
```

Flip horizontally, vertically, or both:

```html
<fa-icon [icon]="['fas', 'coffee']" flip="horizontal"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" flip="vertical"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" flip="both"></fa-icon>
```

Spin and pulse [animation](https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons):

```html
<fa-icon [icon]="['fas', 'spinner']" [spin]="true"></fa-icon>
<fa-icon [icon]="['fas', 'spinner']" [pulse]="true"></fa-icon>
```

[Border](https://fontawesome.com/how-to-use/on-the-web/styling/bordered-pulled-icons):

```html
<fa-icon [icon]="['fas', 'coffee']" [border]="true"></fa-icon>
```

[Pull left or right](https://fontawesome.com/how-to-use/on-the-web/styling/bordered-pulled-icons):

```html
<fa-icon [icon]="['fas', 'coffee']" pull="left"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" pull="right"></fa-icon>
```

### Changing the default prefix

The default prefix, `fas`, can be adjusted by injecting the `FaIconService` and modifying the `defaultPrefix` property.

```typescript
import { FaIconService } from '@fortawesome/angular-fontawesome';

export class AppComponent {

  constructor(private faIconService: FaIconService) {
      this.faIconService.defaultPrefix = 'far';
  }

}
```

### Advanced Usage

With [Mask](https://fontawesome.com/how-to-use/on-the-web/styling/masking) and [Transform](https://fontawesome.com/how-to-use/on-the-web/styling/power-transforms):

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

[Layers](https://fontawesome.com/how-to-use/on-the-web/styling/layering):

```html
<fa-layers [fixedWidth]="true">
  <fa-icon [icon]="['fas', 'square']"></fa-icon>
  <fa-icon [inverse]="true" [icon]="['fas', 'spinner']" transform="shrink-6"></fa-icon>
</fa-layers>
```

[Layers text](https://fontawesome.com/how-to-use/on-the-web/styling/layering):

```html
<fa-layers [fixedWidth]="true">
  <fa-icon [icon]="['fas', 'square']"></fa-icon>
  <fa-layers-text content="Yo" style="color: white;" transform="shrink-4"></fa-layers-text>
</fa-layers>
```

[Layers counters](https://fontawesome.com/how-to-use/on-the-web/styling/layering):

```html
<fa-layers [fixedWidth]="true">
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

Review the following docs before diving in:

* [CONTRIBUTING.md](CONTRIBUTING.md)
* [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

And then:

1. Write more tests like those in `icon.component.spec.ts` to increase our test
   coverage and submit pull requests.

2. If you are an experienced Angular developer, after experimenting with this
   component, provide feedback about what refinements might help it feel more
   like an "Angular" way of doing things. Open a new issue with each distinct
   recommendation, or submit a pull request with your suggested revisions.

## Contributors

The following contributors have either hepled to start this project, have contributed
code, are actively maintaining it (including documentation), or in other ways
being awesome contributors to this project. **We'd like to take a moment to recognize them.**

|                                                            | Name           | GitHub                                             |
|:----------------------------------------------------------:|:---------------|:---------------------------------------------------|
| <img src="https://github.com/devoto13.png?size=72" />      | Yaroslav Admin | [@devoto13](https://github.com/devoto13)           |
| <img src="https://github.com/zeevkatz.png?size=72" />      | Zeev Katz      | [@zeevkatz](https://github.com/zeevkatz)           |
| <img src="https://github.com/scttcper.png?size=72" />      | Scott Cooper   | [@scttcper](https://github.com/scttcper)           |
| <img src="https://github.com/DavidePastore.png?size=72" /> | Davide Pastore | [@DavidePastore](https://github.com/DavidePastore) |
| <img src="https://github.com/donmckenna.png?size=72" /> | donmckenna | [@donmckenna](https://github.com/donmckenna) |
| <img src="https://github.com/paustint.png?size=72" /> | Austin Turner | [@paustint](https://github.com/paustint) |
| <img src="https://github.com/mzellho.png?size=72" /> | Maximilian Zellhofer | [@mzellho](https://github.com/mzellho) |

If we've missed someone (which is quite likely) submit a Pull Request to us and we'll get it resolved.

The Font Awesome team:

|                                                            | Name           | GitHub                                             |
|:----------------------------------------------------------:|:---------------|:---------------------------------------------------|
| <img src="https://github.com/mlwilkerson.png?size=72" />   | Mike Wilkerson | [@mlwilkerson](https://github.com/mlwilkerson)     |
| <img src="https://github.com/supercodepoet.png?size=72" /> | Travis Chase   | [@supercodepoet](https://github.com/supercodepoet) |
| <img src="https://github.com/robmadole.png?size=72" />     | Rob Madole     | [@robmadole](https://github.com/robmadole)         |
| <img src="https://github.com/talbs.png?size=72" />         | Brian Talbot   | [@talbs](https://github.com/talbs)                 |

## Releasing this project

See [DEVELOPMENT.md](DEVELOPMENT.md#release)
