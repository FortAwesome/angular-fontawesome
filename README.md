<a href="https://fontawesome.com">
  <img align="right" width="100" height="100" alt="Official Javascript Component" src="https://img.fortawesome.com/349cfdf6/official-javascript-component.svg">
</a>

# angular-fontawesome

[![npm](https://img.shields.io/npm/v/@fortawesome/angular-fontawesome.svg?style=flat-square)](https://www.npmjs.com/package/@fortawesome/angular-fontawesome)

Official Angular component for Font Awesome 5

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
To get up and running using Font Awesome with Angular follow below steps:

1. Add `FontAwesomeModule` to `imports` in
`src/app/app.module.ts`:

    ```typescript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    
    import { AppComponent } from './app.component';
    import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
    
    @NgModule({
      imports: [
        BrowserModule,
        FontAwesomeModule
      ],
      declarations: [AppComponent],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

2. Tie the icon to the property in your component
`src/app/app.component.ts`:

    ```typescript
    import { Component } from '@angular/core';
    import { faCoffee } from '@fortawesome/free-solid-svg-icons';
    
    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html'
    })
    export class AppComponent {
      faCoffee = faCoffee;
    }
    ```

3. Use the icon in the template
`src/app/app.component.html`:

    ```html
    <fa-icon [icon]="faCoffee"></fa-icon>
    ```

## Documentation

* [In-depth usage guide](./docs/usage.md)
* [Using other styles](./docs/usage/using-other-styles.md)
* [Full feature list](./docs/usage/features.md)
* [Change the default prefix](./docs/usage/default-prefix.md)
* [Upgrading instructions](UPGRADING.md)

## Examples

### Stackblitz
Here's a [StackBlitz Starter Sample](https://stackblitz.com/edit/angular-font-awesome-starter?file=src%2Fapp%2Fapp.module.ts) on how to display Solid, Regular, and Brand icons [using the Icon Library](./docs/usage/icon-library.md#using-the-icon-library).


### Demo application
You can find examples in the `projects/demo` directory. You can follow [the docs to run the demo app](./DEVELOPER.md#setting-up-the-local-environment) on your own machine.

## Contributing
`angular-fontawesome` is a product of the community, you can take a look at the [developer docs](./DEVELOPER.md) to find about more on how to contribute back to the project.

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
| <img src="https://github.com/talbs.png?size=72" />         | Brian Talbot   | [@talbs](https://github.com/talbs) |
