# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

---

## [2.0.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/2.0.0) - 2025-03-18

Converted all library internal component implementation to use reactive Signal API. Now it uses signal, compute, effect, viewChild, etc.

### Added
* Documentation on changes in Programmatic API.
* Documentation for upgrading 1.0.0 to 2.0.0
* Updated code to use signal APIs.

### Removed

* Deprecated the `render` function from the `FaIconComponent`.
* Programmatic API has changed, [please refer here](https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/usage/features.md#programmatic-api) and migration guide [1.0.0 to 2.0.0](docs/upgrading/1.0.0-2.0.0.md)

## [1.0.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/1.0.0) - 2024-11-20

There are no major changes in this release. The version bump is to signal that the library is stable now and no major breaking changes are expected in the future.

### Added

* Support for Angular 19.
* All available icon packages to the `ng-add` schematic.
* Possibility to specify custom `rotate` value for `fa-icon` and `fa-duotone-icon` components.

### Removed

* Angular 18.x is no longer supported. If you are using this version, please, stick with version 0.15.0.

## [0.15.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.15.0) - 2024-05-23

Make sure to check [upgrade instructions](https://github.com/FortAwesome/angular-fontawesome/blob/master/UPGRADING.md).

### Added

* Support for Angular 18.
* Documentation on how to use NPM Kit packages.
* Documentation on how to correctly use fa-stack in standalone components.
* Documentation on how to use custom icons.
* FAQ page with considerations on whether to use this library.
* Configuration option for the `FontAwesomeTestingModule` to not throw errors when adding icons.
* Documentation on how to add global styles to the page.

### Fixed

* Documentation for the `rotate` input.
* Global styles are now correctly added to the page in SSR context.

### Changed

* `icon` input type is now more permissive.
* `@fortawesome/fontawesome-svg-core` became a regular dependency.

### Removed

* Angular 17.x is no longer supported. If you are using this version, please, stick with version 0.14.1.
* Deprecated inputs `spin` and `pulse`. Use `animation` input instead.
* Deprecated inputs `styles` and `classes`.

## [0.14.1](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.14.1) - 2023-12-23

### Fixed

* Removed import from `@fortawesome/fontawesome-common-types`, which was an undeclared dependency.

## [0.14.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.14.0) - 2023-11-08

### Added

* Support for Angular 17.
* Possibility to use all components as standalone.

### Changed

* Examples to use standalone components instead of modules.

### Removed

* Angular 16.x is no longer supported. If you are using this version, please, stick with version 0.13.0.

## [0.13.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.13.0) - 2023-05-04

### Added

* Support for Angular 16.

### Removed

* Angular 15.x is no longer supported. If you are using this version, please, stick with version 0.12.1.

## [0.12.1](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.12.1) - 2023-01-09

### Added

* Support for all animations from Font Awesome 6. See [Animating icons](https://fontawesome.com/docs/web/style/animate).

## [0.12.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.12.0) - 2022-11-18

Make sure to check [upgrade instructions](https://github.com/FortAwesome/angular-fontawesome/blob/master/UPGRADING.md).

### Added

* Support for Angular 15.
* Documentation and option in `ng-add` schematic to use new [Sharp Solid](https://blog.fontawesome.com/introducing-font-awesome-sharp/) icons style. 

### Changed

* Documentation on how to create `fa-icon` programmatically updated to not use deprecated `ComponentFactoryResolver`.

### Deprecated

* `classes` and `styles` inputs on all components are deprecated for removal as confusing and generally not useful. See [upgrade instructions](https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/upgrading/0.11.0-0.12.0.md#remove-usage-of-the-deprecated-styles-and-classes-inputs) for the suggested migration path.

### Removed

* Angular 14.x is no longer supported. If you are using this version, please, stick with version 0.11.1.

## [0.11.1](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.11.1) - 2022-06-16

### Fixed

* Added a missing peer dependency on `@angular/core`.

## [0.11.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.11.0) - 2022-06-03

### Added

* Support for Angular 14.

### Removed

* Angular 13.x is no longer supported. If you are using this version, please, stick with version 0.10.2.

## [0.10.2](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.10.2) - 2022-03-20

### Added

* `position` input for `fa-layers-counter` component.
* `@fortawesome/fontawesome-svg-core@^6.1.0` as a valid peer dependency.
* Possible to pick v5 or v6 to the ng-add schematic.

## [0.10.1](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.10.1) - 2021-11-13

### Added

* Official support for Font Awesome 6 Beta.
* Support for icon aliases introduced in Font Awesome 6 Beta.

## [0.10.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.10.0) - 2021-11-03

Make sure to check [upgrade instructions](https://github.com/FortAwesome/angular-fontawesome/blob/master/UPGRADING.md).

### Added

* Support for Angular 13.
* [Guides](https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/guide/advanced-uses.md) on more advanced use cases.

### Changed

* Approaches documentation has been improved.

### Removed

* Deprecated support for the global icon library.
* Angular 12.x is no longer supported. If you are using this version, please, stick with version 0.9.0.

## [0.9.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.9.0) - 2021-05-13

### Added

* Support for Angular 12.

### Removed

* Angular 11.x is no longer supported. If you are using this version, please, stick with version 0.8.2.

## [0.8.2](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.8.2) - 2021-02-03

### Fixed
* Crash when running `ng add` in Angular CLI 11.1 project. ([#291](https://github.com/FortAwesome/angular-fontawesome/issues/291))

## [0.8.1](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.8.1) - 2020-12-11

### Fixed

* Support fa-layers with content wrapped into ng-container. ([#283](https://github.com/FortAwesome/angular-fontawesome/issues/283))
* Warn about missing stackItemSize on fa-icon inside fa-stack instead of silently dropping elements. ([#177](https://github.com/FortAwesome/angular-fontawesome/issues/177))

## [0.8.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.8.0) - 2020-11-12

### Fixed

* Fixed ng add crash if tslint is not installed.

### Added

* Support for Angular 11.
* [Documentation](https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/guide/storybook.md) on how to use angular-fontawesome with Storybook.

### Removed

* Angular 10.x is no longer supported. If you are using this version, please, stick with version 0.7.0.

## [0.7.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.7.0) - 2020-07-08

### Fixed

* Make it possible to use `fa-duotone-icon` with custom duotone icons.

### Added

* Support for Angular 10.

### Removed

* Angular 9.x is no longer supported. If you are using this version, please, stick with version 0.6.1.

## [0.6.1](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.6.1) - 2020-03-28

### Fixed

* Fixed crash when running `ng add` schematic on a project using Angular 9.1 and TypeScript 3.7.

## [0.6.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.6.0) - 2020-02-08

Make sure to check [upgrade instructions](https://github.com/FortAwesome/angular-fontawesome/blob/master/UPGRADING.md).

### Added

* [`FaConfig.fixedWidth` property](https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/usage/icon-library.md#apply-fixed-width-by-default) to provide a default value for `FaIcon.fixedWidth` and `FaLayers.fixedWidth` properties.
* Documentation of a [convenient approach](https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/guide/testing.md#define-a-wrapper-module-for-fontawesomemodule) to test components using icon library.

### Removed

* Angular 8.x is no longer supported. If you are using this version, please, stick with version 0.5.0.

## [0.6.0-alpha.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.6.0-alpha.0) - 2019-11-11

Make sure to check [upgrade instructions](https://github.com/FortAwesome/angular-fontawesome/blob/master/UPGRADING.md).

### Added

* Support for Angular 9 and Ivy.
* [`FontAwesomeTestingModule`](https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/guide/testing.md#use-fontawesometestingmodule-to-mock-icon-library) to simplify testing components using icon library.
* `FaConfig.fallbackIcon` which allows to specify a fallback icon to use when `FaIconComponent.icon` is not set or specified icon definition is missing from the icon library.
* `ng-add` schematic to simplify initial library setup.
* [Documentation](https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/guide/testing.md) on how to test components using Font Awesome icons.
* `LICENSE` file into the published package.

### Changed

* `FaConfig.globalLibrary` default value has been changed to `false`. `fa-icon`/`fa-duotone-icon` won't look for icon definitions in the global icon library by default. See [upgrade instructions](https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/upgrading/0.4.0-0.5.0.md#migrate-from-global-icon-library-to-faiconlibrary) for the previous release for more details about this change.
* Warning when `FaIconComponent.icon` is not set or specified icon definition is missing in the icon library was changed into a hard error to make it more clear and visible (in particular in the unit tests).

### Removed

* `FaIconComponent.iconProp` was removed. Use `FaIconComponent.icon` instead.
* `FaIconComponent.listItem` was removed. Use `FaIconComponent.fixedWidth` + custom CSS to render icons as list markers.
* `FaIconService` was removed. Use `FaConfig` instead.

## [0.5.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.5.0) - 2019-08-12

Make sure to check [upgrade instructions](https://github.com/FortAwesome/angular-fontawesome/blob/master/UPGRADING.md).

### Added

* Added `fa-stack` component to stack [two icons together](https://fontawesome.com/how-to-use/on-the-web/styling/stacking-icons):

    ```html
    <fa-stack>
      <fa-icon [icon]="faCircle" stackItemSize="2x"></fa-icon>
      <fa-icon [icon]="faFlag" [inverse]="true" stackItemSize="1x"></fa-icon>
    </fa-stack>
    ```
* Added `fa-duotone-icon` component to work with [duotone icons](https://fontawesome.com/how-to-use/on-the-web/styling/duotone-icons):

    ```html
    <fa-duotone-icon [icon]="['fad', 'coffee']" primaryColor="red" secondaryColor="blue"></fa-duotone-icon>
    ```
* Added [an official method](https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/usage/features.md#programmatic-api) to update `FaIconComponent` and `FaDuotoneIconComponent` programmatically.
* Added `FaIconLibray` class to replace deprecated global icon library from `@fortawesome/fontawesome-svg-core` package.
* Added `a11yRole` input for `fa-icon` and `fa-duotone-icon` components to support customizing `role` attribute of the rendered SVG icon.
* Added `FaConfig` class to globally configure `angular-fontawesome`.
* Added a table in README.md to document compatibility with major Angular versions.
* Added instructions on how to install library with NPM.

### Changed

* Restructured documentation to make it easier to navigate and extend.
* Changed semantics of the `FaIconComponent.icon` property. It used to have type `Icon` - rendered icon object and is now changed into component input to specify icon definition with type `IconProp`.

### Deprecated

* `FaIconComponent.iconProp` is deprecated. Use `FaIconComponent.icon` instead.
* Warning when `FaIconComponent.icon` is not set or specified icon definition is missing in the icon library is deprecated. It will throw a hard error in the next version.
* `FaIconComponent.listItem` is deprecated. Use `FaIconComponent.fixedWidth` + custom CSS to render icons as list markers.
* `FaIconService` is deprecated in favour of `FaConfig`.

### Fixed

* Fixed title-tooltip not being displayed in IE 11 in some cases.

## [0.4.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.4.0) - 2019-03-28

### Added

* Angular 8.x is added as a valid peer dependency.
* Minor documentation updates and fixes.
* LICENSE.md file to the repository.

### Removed

* Angular 6.x and Angular 7.x are no longer supported. If you are using these versions, please, stick with version 0.3.0.

## [0.3.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.3.0) - 2018-10-24

### Added

* Angular 7+ is added as a valid peer dependency.

## [0.2.1](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.2.1) - 2018-10-08

### Fixed

* Made it possible to set custom classes on `fa-layers` component. 

## [0.2.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.2.0) - 2018-09-07

### Added

* Added `size` and `fixedWidth` properties for `fa-layers` component. These can be used instead of setting `fa-fw` and `fa-4x` classes manually.

    Before:
    
      <span class="fa-fw fa-4x"><fa-layers>...</fa-layers></span>
    
    After:
    
      <fa-layers [fixedWidth]="true" size="4x">...</fa-layers>
        
* Added possibility to customize [default icon prefix](https://github.com/FortAwesome/angular-fontawesome#changing-the-default-prefix).

### Removed

* Support for Angular 5 was removed. Now `angular-fontawesome` requires Angular 6+.

### Fixed

* Added missing peer dependencies for `tsickle` and `tslib` packages.


## [0.1.1](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.1.1) - 2018-06-26

### Changed
* Use angular-cli for building the demo app.
* Cleaned up some old configurations from previous use of angular-librarian which had been breaking
  the build when using `0.1.0`.

## [0.1.0](https://github.com/FortAwesome/angular-fontawesome/releases/tag/0.1.0) - 2018-06-20

### Added
* Initial stable, production-ready release of angular-fontawesome
