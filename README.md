# angular-fontawesome

[![Build Status](https://travis-ci.org/devoto13/angular-fontawesome.svg?branch=master)](https://travis-ci.org/devoto13/angular-fontawesome)

Angular component for Font Awesome 5, built with 
[Angular Librarian](https://github.com/gonzofish/angular-librarian) and 
conforming to the 
[Angular Package Format](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit?usp=sharing). 

## Basic Usage

Add an icon to an Angular template:

```
<fa-icon [icon]="faUser"></fa-icon>
```

Run `yarn start` or `npm run start` to see more example uses.

## Advanced Usage

*With Mask and Transform*
```
<fa-icon [icon]="faCircle" transform="shrink-9 right-4" [mask]="faSquare"></fa-icon>
```

*Spin animation with click toggle*
```
<fa-icon [icon]="faSync" [spin]="isSyncAnimated" (click)="isSyncAnimated=!isSyncAnimated"></fa-icon>
```

*Transform within binding*
```
<fa-icon [icon]="faMagic" transform="rotate-{{magicLevel}}"></fa-icon>
<input type='range' [value]="magicLevel" (input)="magicLevel=$event.target.value"/>
```
(Slide input range to "turn up the magic")

## Project Status

This project is a work in progress, not yet production ready.

We're now
inviting early adopters who like living on the edge, are willing to
figure out some things on their own, and reply with refining feedback
and pull requests, to jump into this with us and drive it toward its
first stable release.

This component depends upon the
Font Awesome 5 base API library, `@fortawesome/fontawesome-svg-core`, and uses
the icon pack libraries such as
`@fortawesome/free-solid-svg-icons`.

## Tree Shaking

Tree shaking—automatically eliminating unused icons from the final bundle—Just Works<sup>TM</sup>.

## How to Help

1. Write more tests like those in `icon.component.spec.ts` to increase our
test coverage and submit pull requests.

2. If you are an experienced Angular developer, after experimenting with
this component, provide feedback about what refinements might help it
feel more like an "Angular" way of doing things. Open a new issue with
each distinct recommendation, or submit a pull request with your suggested revisions.
