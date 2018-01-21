# angular-fontawesome

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
Font Awesome 5 base API library, `@fortawesome/fontawesome`, and uses 
the icon pack libraries such as 
`@fortawesome/fontawesome-free-solid`. 

Much of this 
project's work thus far has been to drive changes down into those
underlying packages, such as adding Type Script for the whole framework
and moving away from the use of 
[default exports](https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html).

## Tree Shaking

As of January 17, 2018, we are in the process of simplifying the developer
experience for Angular developers to make tree shaking work more 
easily. Pro subscribers can follow some of that conversation 
[here](https://github.com/FortAwesome/Font-Awesome-Pro/issues/978).

In the meantime, enabling tree shaking requires 
[some extra configuration](https://fontawesome.com/how-to-use/use-with-node-js#tree-shaking).

Some have used the following Type Script configuration in `tsconfig.json`:

```
{
  "compilerOptions": {
    "paths": {
      "@fortawesome/fontawesome-free-solid": ["node_modules/@fortawesome/fontawesome-free-solid/shakable.es.js"],
      "@fortawesome/fontawesome-free-brands": ["node_modules/@fortawesome/fontawesome-free-brands/shakable.es.js"]
    }
  }
}
```

## Additional Context

We are developing official `@fortawesome`-scoped components for several JavaScript development
frameworks, such as Angular, React, Ember and Vue. We intend to balance 
_consistency_ of developer experience across these various components 
with best practices and patterns that may be _distinct_ within each of
those frameworks. So, for example, we want it to feel natural for one
who is accustomed to an Angular mindset to use this Angular component.

Since there are some concepts that are consistent between this component
and our React component, and is since the 
[React component's documentation](https://github.com/FortAwesome/react-fontawesome/blob/master/README.md) is currently 
more comprehensive, some readers may benefit from also reviewing it. 
It may help you to infer how to use and experiment with this Angular 
component.

## How to Help

1. Write more tests like those in `icon.component.spec.ts` to increase our
test coverage and submit pull requests.

2. If you are an experienced Angular developer, after experimenting with 
this component, provide feedback about what refinements might help it 
feel more like an "Angular" way of doing things. Open a new issue with 
each distinct recommendation.
