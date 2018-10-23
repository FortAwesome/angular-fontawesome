# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

---

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
