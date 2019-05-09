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
  * [Using Explicit Reference](./docs/usage/explicit-reference.md)
  * [Using the Icon Library](./docs/usage/icon-library.md)
  * [In Depth Usage Guide](./docs/usage.md#usage)
- [Features](./docs/usage/features.md#features)
  * [Using other styles](./docs/usage/using-other-styles.md)
  * [Basic](./docs/usage/features.md#basic)
  * [Advanced usage](./docs/usage/features.md#advanced-usage)
  * [Changing the default prefix](#/docs/usage/features/default-prefix.md)
- [Examples](#examples)
- [Contributing][#contributing]
- [Contributors](#contributors)

<!-- tocstop -->

## Get started

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

### Going from an older pre-release version of angular-fontawesome?

See [the upgrade guide](./docs/upgrading.md).

You might also be interested in the larger umbrella project [upgrade guide](https://github.com/FortAwesome/Font-Awesome/blob/master/UPGRADING.md)

## Installation

Using [Yarn](https://yarnpkg.com)
```
$ yarn add @fortawesome/fontawesome-svg-core
$ yarn add @fortawesome/free-solid-svg-icons
# See Compatibility table below to choose correct version
$ yarn add @fortawesome/angular-fontawesome@<version>
```

Using [NPM](https://www.npmjs.com/)
```
$ npm install @fortawesome/fontawesome-svg-core
$ npm install @fortawesome/free-solid-svg-icons
# See Compatibility table below to choose correct version
$ npm install @fortawesome/angular-fontawesome@<version>
```

### Compatiblity table

|@fortawesome/angular-fontawesome|Angular|
|-|-|
|0.1.x|5.x|
|0.2.x|6.x|
|0.3.x|6.x && 7.x|
|0.4.x|8.x|

## Usage
To get up and running using FontAwesome with Angular, you can simply do the following:

### Import the FontAwesomeModule
`src/app/app.module.ts`

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

### Tie the icon to your component
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

### Use the Icon
`src/app/app.component.html`

```html
<div style="text-align:center">
  <fa-icon [icon]="faCoffee"></fa-icon>
</div>
```

### Next Steps
For more advanced usage:
* [In-depth usage guide](./docs/usage.md)
* [Using Other Styles](./docs/usage/using-other-styles.md)
* [Full feature list](./docs/usage/features.md)
* [Change the default prefix](./docs/usage/default-prefix.md)

## Examples

### Stackblitz
Here's a [StackBlitz Starter Sample](https://stackblitz.com/edit/angular-font-awesome-starter?file=src%2Fapp%2Fapp.module.ts) on how to display Solid, Regular, and Brand icons [using the Icon Library](./docs/usage/icon-library.md#using-the-icon-library).


### Example App.
You can find examples in the `src/app` directory. You can follow [the docs to run the example app](./docs/developer/sample-app.md) on your own machine.


## Contributing
`angular-fontawesome` is a product of the community, you can take a look at the [developer docs](./docs/developer.md) to find about more on how to contribute back to the project.


## Contributors

The following contributors have either helped to start this project, have contributed
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
| <img src="https://github.com/elebitzero.png?size=72" width="72" /> | elebitzero | [@elebitzero](https://github.com/elebitzero) |
| <img src="https://github.com/mcenkar.png?size=72" width="72" /> | mcenkar | [@mcenkar](https://github.com/mcenkar) |
| <img src="https://github.com/SiddAjmera.png?size=72" /> | Siddharth Ajmera | [@SiddAjmera](https://github.com/SiddAjmera) |
| <img src="https://github.com/stephaniepurvis.png?size=72" /> | Stephanie Purvis | [@stephaniepurvis](https://github.com/stephaniepurvis) |
| <img src="https://github.com/loicgasser.png?size=72" /> | Gasser Loïc | [@loicgasser](https://github.com/loicgasser) |
| <img src="https://github.com/damienwebdev.png?size=72" /> | Damien Retzinger | [@damienwebdev](https://github.com/damienwebdev) |

If we've missed someone (which is quite likely) submit a Pull Request to us and we'll get it resolved.

The Font Awesome team:

|                                                            | Name           | GitHub                                             |
|:----------------------------------------------------------:|:---------------|:---------------------------------------------------|
| <img src="https://github.com/mlwilkerson.png?size=72" />   | Mike Wilkerson | [@mlwilkerson](https://github.com/mlwilkerson)     |
| <img src="https://github.com/supercodepoet.png?size=72" /> | Travis Chase   | [@supercodepoet](https://github.com/supercodepoet) |
| <img src="https://github.com/robmadole.png?size=72" />     | Rob Madole     | [@robmadole](https://github.com/robmadole)         |
| <img src="https://github.com/talbs.png?size=72" />         | Brian Talbot   | [@talbs](https://github.com/talbs)
