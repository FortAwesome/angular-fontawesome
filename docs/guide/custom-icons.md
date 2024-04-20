# Custom icons

This guide explains how to use custom icons with `angular-fontawesome`.

First of all, you'll need a valid SVG file containing the icon you want to use. Please refer to
the [Icon Design Guidelines](https://docs.fontawesome.com/web/add-icons/upload-icons/icon-design)
and [Prep Icons for Upload](https://docs.fontawesome.com/web/add-icons/upload-icons/prep-icons) to learn how to create
an SVG icon which can be used with Font Awesome.

## Icon definition

To use a custom icon in the project, you need to define an object specified by the `IconDefinition` type. All icons are
defined using the same structure, so you can refer to existing icons as examples. The object should contain the 
following properties:

```typescript
export interface IconDefinition {
    prefix: string; // prefix of the icon
    iconName: string; // name of the icon
    icon: [
        number, // viewBox width
        number, // viewBox height
        string[], // ligatures (not used in `angular-fontawesome`)
        string, // unicode (not used in `angular-fontawesome`)
        string | string[], // single path for a simple icon or array of two paths for a duotone icon
    ];
}
```

Knowing the icon structure, you can easily convert the SVG file to the `IconDefinition` object by picking up the
relevant parts. Given an example SVG file:

```xml

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
</svg>
```

The icon definition will look like the following:

```typescript
import { IconDefinition } from '@fortawesome/angular-fontawesome';

const myIcon: IconDefinition = {
    prefix: 'fac',
    iconName: 'my-icon',
    icon: [
        512,
        512,
        [],
        '',
        'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z',
    ],
};
```

You can also use a [Font Awesome Kit](https://fontawesome.com/kits) to upload your custom icons or pick only the icons
you'd like to use.

## Use custom icon

To use a custom icon is no different from a Font Awesome icon. You can either add it to
the [icon library](./icon-library.md) or use an [explicit references](./explicit-reference.md) approach.
