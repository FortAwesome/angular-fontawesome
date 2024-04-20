# Frequently asked questions

## Should I use this library?

There are multiple ways to add FontAwesome icons to your Angular project, to name a few:

1. An Angular component which aims to offer the best Angular experience: `ng add`, type checking, etc.
2. FontAwesome SVG Core which Angular component uses under the hood. It is more flexible in some situations, but does
   not offer the above features.
3. FontAwesome Free/Pro.
4. [Font Awesome Kits](https://fontawesome.com/kits).

Depending on your needs, you may want to use this library or another method.

For an average Angular project we recommend this library. It would feel the most natural. If occasionally you need more
flexibility, it can be achieved
following [this guide](https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/guide/advanced-uses.md#replace-i-tags-with-icons-in-the-arbitrary-html).

For a project where most of the icons are dynamic (e.g. a CMS project) and come in `<i>` form, you may have better luck
to give up on type-checking and go with FontAwesome SVG Core or FontAwesome Free/Pro (in particular if you need some
rarely used features only available to Web Fonts).

If you're a Pro-user, you can also use the [Font Awesome Kits](https://fontawesome.com/kits) (specifically Kit NPM
packages) with this library. This way you reduce the footprint of the icons in the `node_modules`, reduce work spent on
removing unused icons from the bundle and get a convenient way to manage your custom icons. However, it will come with
the cost of managing icons separately from the codebase.
