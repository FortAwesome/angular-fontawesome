<a href="https://fontawesome.com">
  <img align="right" width="100" height="100" alt="Official Javascript Component" src="https://img.fortawesome.com/349cfdf6/official-javascript-component.svg">
</a>

# angular-fontawesome

[![npm](https://img.shields.io/npm/v/@fortawesome/angular-fontawesome.svg?style=flat-square)](https://www.npmjs.com/package/@fortawesome/angular-fontawesome)

Official Angular component for Font Awesome 6+

## Installation

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
Here's a [StackBlitz Starter Sample](https://stackblitz.com/edit/angular-fontawesome-sample?file=src%2Fapp%2Fapp.module.ts) on how to display Solid, Regular, and Brand icons [using the Icon Library](./docs/usage/icon-library.md#using-the-icon-library).


### Demo application
You can find examples in the `projects/demo` directory. You can follow [the docs to run the demo app](./DEVELOPER.md#setting-up-the-local-environment) on your own machine.

## Contributing
`angular-fontawesome` is a product of the community, you can take a look at the [developer docs](./DEVELOPER.md) to find about more on how to contribute back to the project.

## Contributors

The following contributors have either helped to start this project, have contributed
code, are actively maintaining it (including documentation), or in other ways
being awesome contributors to this project. **We'd like to take a moment to recognize them.**

| Name              | GitHub                                                    |
| ----------------- | --------------------------------------------------------- |
| devoto13          | [@devoto13](https://github.com/devoto13)                  |
| zeevkatz          | [@zeevkatz](https://github.com/zeevkatz)                  |
| scttcper          | [@scttcper](https://github.com/scttcper)                  |
| DavidePastore     | [@DavidePastore](https://github.com/DavidePastore)        |
| donmckenna        | [@donmckenna](https://github.com/donmckenna)              |
| paustint          | [@paustint](https://github.com/paustint)                  |
| mzellho           | [@mzellho](https://github.com/mzellho)                    |
| elebitzero        | [@elebitzero](https://github.com/elebitzero)              |
| mcenkar           | [@mcenkar](https://github.com/mcenkar)                    |
| SiddAjmera        | [@SiddAjmera](https://github.com/SiddAjmera)              |
| stephaniepurvis   | [@stephaniepurvis](https://github.com/stephaniepurvis)    |
| loicgasser        | [@loicgasser](https://github.com/loicgasser)              |
| damienwebdev      | [@damienwebdev](https://github.com/damienwebdev)          |
| ronniebarker      | [@ronniebarker](https://github.com/ronniebarker)          |
| bhanuhiteshi      | [@bhanuhiteshi](https://github.com/bhanuhiteshi)          |
| MrSuttonmann      | [@MrSuttonmann](https://github.com/MrSuttonmann)          |
| peterblazejewicz  | [@peterblazejewicz](https://github.com/peterblazejewicz)  |
| arjenbrandenburgh | [@arjenbrandenburgh](https://github.com/arjenbrandenburgh)|
| athisun           | [@athisun](https://github.com/athisun)                    |
| madebyjeffrey     | [@madebyjeffrey](https://github.com/madebyjeffrey)        |
| benjamincharity   | [@benjamincharity](https://github.com/benjamincharity)    |
| Font Awesome Team | [@FortAwesome](https://github.com/orgs/FortAwesome/people)|

If we've missed someone (which is quite likely) submit a Pull Request to us and we'll get it resolved.
