# Features

The following features are available as part of Font Awesome. Note that the syntax is different from our general web-use documentation.

## Basic

### Size
[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons)
```html
<fa-icon [icon]="['fas', 'coffee']" size="xs"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" size="lg"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" size="6x"></fa-icon>
```

### Fixed Width
[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/fixed-width-icons):

```html
<fa-icon [icon]="['fas', 'coffee']" [fixedWidth]="true"></fa-icon>
```

### Rotate
[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/rotating-icons):

```html
<fa-icon [icon]="['fas', 'coffee']" rotate="90"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" rotate="180"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" rotate="270"></fa-icon>
```

### Flip
* horizontally, vertically, or both

```html
<fa-icon [icon]="['fas', 'coffee']" flip="horizontal"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" flip="vertical"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" flip="both"></fa-icon>
```

### Animations
[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons)

```html
<fa-icon [icon]="['fas', 'spinner']" [spin]="true"></fa-icon>
<fa-icon [icon]="['fas', 'spinner']" [pulse]="true"></fa-icon>
```

### Border
[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/bordered-pulled-icons):

```html
<fa-icon [icon]="['fas', 'coffee']" [border]="true"></fa-icon>
```

### Pull
[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/bordered-pulled-icons):

```html
<fa-icon [icon]="['fas', 'coffee']" pull="left"></fa-icon>
<fa-icon [icon]="['fas', 'coffee']" pull="right"></fa-icon>
```

### Custom Classes

```html
<fa-icon [icon]="['fas', 'coffee']" [classes]="['my-icon-class']"></fa-icon>
```

### Default Style
```html
<fa-icon [icon]="['fas', 'coffee']" [styles]="{'stroke': 'red', 'color': 'red'}"></fa-icon>
```

## Duotone icons

### Basic use

[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/duotone-icons#basic-use):

```html
<fa-duotone-icon [icon]="['fad', 'coffee']"></fa-duotone-icon>
```

### Swap layers opacity

[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/duotone-icons#swapping-layers):

```html
<fa-duotone-icon [icon]="['fad', 'coffee']" swapOpacity="true"></fa-duotone-icon>
```

### Customize layers opacity

[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/duotone-icons#changing-opacity):

```html
<fa-duotone-icon [icon]="['fad', 'coffee']" primaryOpacity="0.9"></fa-duotone-icon>
<fa-duotone-icon [icon]="['fad', 'coffee']" secondaryOpacity="0.1"></fa-duotone-icon>
```

### Customize layers color

[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/duotone-icons#coloring):

```html
<fa-duotone-icon [icon]="['fad', 'coffee']" primaryColor="red"></fa-duotone-icon>
<fa-duotone-icon [icon]="['fad', 'coffee']" secondaryColor="blue"></fa-duotone-icon>
```

## Advanced Usage

### Mask
[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/masking)
```html
<fa-icon [icon]="['fas', 'coffee']" [mask]="['fas', 'square']"></fa-icon>
```

### Transform
[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/power-transforms)

```html
<fa-icon [icon]="['fas', 'coffee']" transform="shrink-9 right-4"></fa-icon>
```

### Stateful Animations
```html
<fa-icon [icon]="['fas', 'sync']" [spin]="isSyncAnimated" (click)="isSyncAnimated=!isSyncAnimated"></fa-icon>
```

### Transform within binding:

```html
<fa-icon [icon]="['fas', 'magic']" transform="rotate-{{magicLevel}}"></fa-icon>
<input type='range' [value]="magicLevel" (input)="magicLevel=$event.target.value"/>
```
(Slide input range to "turn up the magic")

### Stacked icons

Each `<fa-icon>` declared inside an `<fa-stack>` element **must** include the `stackItemSize` input parameter, otherwise the icon will not render.

[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/stacking-icons):

```html
<fa-stack>
  <fa-icon [icon]="faCircle" stackItemSize="2x"></fa-icon>
  <fa-icon [icon]="solidFlag" [inverse]="true" stackItemSize="1x"></fa-icon>
</fa-stack>
```

### Layers
[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/layering):

```html
<fa-layers [fixedWidth]="true">
  <fa-icon [icon]="['fas', 'square']"></fa-icon>
  <fa-icon [inverse]="true" [icon]="['fas', 'spinner']" transform="shrink-6"></fa-icon>
</fa-layers>
```

### Layers with text
[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/layering):

```html
<fa-layers [fixedWidth]="true">
  <fa-icon [icon]="['fas', 'square']"></fa-icon>
  <fa-layers-text content="Yo" style="color: white;" transform="shrink-4"></fa-layers-text>
</fa-layers>
```

### Layers with counter
[FontAwesome Spec](https://fontawesome.com/how-to-use/on-the-web/styling/layering):

```html
<fa-layers [fixedWidth]="true">
  <fa-icon [icon]="['fas', 'envelope']"></fa-icon>
  <fa-layers-counter content="99+"></fa-layers-counter>
</fa-layers>
```

### Programmatic API

To create `FaIconComponent` dynamically using `ComponentFactoryResolver`:

```ts
@Component({
  selector: 'fa-host',
  template: '<ng-container #host></ng-container>'
})
class HostComponent {
  @ViewChild('host', {static: true, read: ViewContainerRef}) container: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver) {
  }

  createIcon() {
    const factory = this.cfr.resolveComponentFactory(FaIconComponent);
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.icon = faUser;
    // Note that FaIconComponent.render() should be called to update the
    // rendered SVG after setting/updating component inputs.
    componentRef.instance.render();
  }
}
```

To update `FaIconComponent` programmatically:

```ts
@Component({
  selector: 'fa-host',
  template: '<fa-icon [icon]="faUser" (click)="spinIcon()"></fa-icon>'
})
class HostComponent {
  faUser = faUser;

  @ViewChild(FaIconComponent, {static: true}) iconComponent: FaIconComponent;

  spinIcon() {
    this.iconComponent.spin = true;
    // Note that FaIconComponent.render() should be called to update the
    // rendered SVG after setting/updating component inputs.
    this.iconComponent.render();
  }
}
```
