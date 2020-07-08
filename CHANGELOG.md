# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

---

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
