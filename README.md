<a href="https://fontawesome.com">
  <img align="right" width="100" height="100" alt="Official Javascript Component" src="https://img.fortawesome.com/349cfdf6/official-javascript-component.svg">
</a>

# angular-fontawesome

[![npm](https://img.shields.io/npm/v/@fortawesome/angular-fontawesome.svg?style=flat-square)](https://www.npmjs.com/package/@fortawesome/angular-fontawesome)

Official Angular component for Font Awesome 5+

## Installation

If you have [FontAwesome Pro](https://fontawesome.com/plans) subscription, make sure to [configure access](https://fontawesome.com/docs/web/setup/packages#_1-configure-access) before following the installation instructions.

Using `ng add`:

```
# See Compatibility table below to choose a correct version
$ ng add @fortawesome/angular-fontawesome@<version>
```

Using [Yarn](https://yarnpkg.com)
```
$ yarn add @fortawesome/fontawesome-svg-core
$ yarn add @fortawesome/free-solid-svg-icons
# See Compatibility table below to choose a correct version
$ yarn add @fortawesome/angular-fontawesome@<version>
```

Using [NPM](https://www.npmjs.com/)
```
$ npm install @fortawesome/fontawesome-svg-core
$ npm install @fortawesome/free-solid-svg-icons
# See Compatibility table below to choose a correct version
$ npm install @fortawesome/angular-fontawesome@<version>
```

### Compatibility table

|@fortawesome/angular-fontawesome|Angular|Font Awesome|ng-add|
|-|-|-|-|
|0.1.x|5.x|5.x|not supported|
|0.2.x|6.x|5.x|not supported|
|0.3.x|6.x && 7.x|5.x|not supported|
|0.4.x, 0.5.x|8.x|5.x|not supported|
|0.6.x|9.x|5.x|supported|
|0.7.x|10.x|5.x|supported|
|0.8.x|11.x|5.x|supported|
|0.9.x|12.x|5.x|supported|
|0.10.x|13.x|5.x && 6.x|supported|
|0.11.x|14.x|5.x && 6.x|supported|
|0.12.x|15.x|5.x && 6.x|supported|
|0.13.x|16.x|5.x && 6.x|supported|

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
* [Upgrading instructions](UPGRADING.md)

## Examples

### Stackblitz
Here's a [StackBlitz Starter Sample](https://stackblitz.com/edit/angular-ivy-7jrcne) on how to display Solid, Regular, and Brand icons [using the Icon Library](./docs/usage/icon-library.md#using-the-icon-library).


### Demo application
You can find examples in the `projects/demo` directory. You can follow [the docs to run the demo app](./DEVELOPER.md#setting-up-the-local-environment) on your own machine.

## Contributing
`angular-fontawesome` is a product of the community, you can take a look at the [developer docs](./DEVELOPER.md) to find about more on how to contribute back to the project.

## Contributors

The following contributors have either helped to start this project, have contributed
code, are actively maintaining it (including documentation), or in other ways
being awesome contributors to this project. **We'd like to take a moment to recognize them.**

[<img src="https://github.com/devoto13.png?size=72" alt="devoto13" width="72">](https://github.com/devoto13)
[<img src="https://github.com/zeevkatz.png?size=72" alt="zeevkatz" width="72">](https://github.com/zeevkatz)
[<img src="https://github.com/scttcper.png?size=72" alt="scttcper" width="72">](https://github.com/scttcper)
[<img src="https://github.com/DavidePastore.png?size=72" alt="DavidePastore" width="72">](https://github.com/DavidePastore)
[<img src="https://github.com/donmckenna.png?size=72" alt="donmckenna" width="72">](https://github.com/donmckenna)
[<img src="https://github.com/paustint.png?size=72" alt="paustint" width="72">](https://github.com/paustint)
[<img src="https://github.com/mzellho.png?size=72" alt="mzellho" width="72">](https://github.com/mzellho)
[<img src="https://github.com/elebitzero.png?size=72" alt="elebitzero" width="72">](https://github.com/elebitzero)
[<img src="https://github.com/mcenkar.png?size=72" alt="mcenkar" width="72">](https://github.com/mcenkar)
[<img src="https://github.com/SiddAjmera.png?size=72" alt="SiddAjmera" width="72">](https://github.com/SiddAjmera)
[<img src="https://github.com/stephaniepurvis.png?size=72" alt="stephaniepurvis" width="72">](https://github.com/stephaniepurvis)
[<img src="https://github.com/loicgasser.png?size=72" alt="loicgasser" width="72">](https://github.com/loicgasser)
[<img src="https://github.com/damienwebdev.png?size=72" alt="damienwebdev" width="72">](https://github.com/damienwebdev)
[<img src="https://github.com/ronniebarker.png?size=72" alt="ronniebarker" width="72">](https://github.com/ronniebarker)
[<img src="https://github.com/bhanuhiteshi.png?size=72" alt="bhanuhiteshi" width="72">](https://github.com/bhanuhiteshi)
[<img src="https://github.com/MrSuttonmann.png?size=72" alt="MrSuttonmann" width="72">](https://github.com/MrSuttonmann)
[<img src="https://github.com/ej2.png?size=72" alt="ej2" width="72">](https://github.com/ej2)
[<img src="https://github.com/peterblazejewicz.png?size=72" alt="peterblazejewicz" width="72">](https://github.com/peterblazejewicz)
[<img src="https://github.com/arjenbrandenburgh.png?size=72" alt="arjenbrandenburgh" width="72">](https://github.com/arjenbrandenburgh)
[<img src="https://github.com/athisun.png?size=72" alt="athisun" width="72">](https://github.com/athisun)
[<img src="https://github.com/madebyjeffrey.png?size=72" alt="madebyjeffrey" width="72">](https://github.com/madebyjeffrey)
[<img src="https://github.com/benjamincharity.png?size=72" alt="benjamincharity" width="72">](https://github.com/benjamincharity)
[<img src="https://github.com/NayeBeckham.png?size=72" alt="NayeBeckham" width="72">](https://github.com/NayeBeckham)
[<img src="https://github.com/FortAwesome.png?size=72" alt="Font Awesome Team" width="72">](https://github.com/orgs/FortAwesome/people)

If we've missed someone (which is quite likely) submit a Pull Request to us and we'll get it resolved.
