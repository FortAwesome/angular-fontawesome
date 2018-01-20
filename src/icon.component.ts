import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  FaSymbol,
  FlipProp,
  icon,
  IconLookup,
  IconProp,
  parse,
  PullProp,
  RotateProp,
  SizeProp,
  Transform,
} from '@fortawesome/fontawesome';

function isIconLookup(i: IconProp): i is IconLookup {
  return (<IconLookup>i).prefix !== undefined && (<IconLookup>i).iconName !== undefined;
}

function normalizeIconArgs (iconSpec: IconProp): IconLookup {
  if (typeof iconSpec === 'undefined' || iconSpec === null) {
    return null;
  }

  if (isIconLookup(iconSpec)) {
    return iconSpec;
  }

  if (Array.isArray(iconSpec) && (<Array<string>>iconSpec).length === 2) {
    return { prefix: iconSpec[0], iconName: iconSpec[1] };
  }

  if (typeof iconSpec === 'string') {
    return { prefix: 'fas', iconName: iconSpec };
  }
}

function objectWithKey (key: string, value: any) {
  return ((Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value)) ? {[key]: value} : {};
}

export interface Props {
  icon: IconProp;
  mask?: IconProp;
  className?: string;
  spin?: boolean;
  pulse?: boolean;
  border?: boolean;
  fixedWidth?: boolean;
  listItem?: boolean;
  flip?: FlipProp;
  size?: SizeProp;
  pull?: PullProp;
  rotate?: RotateProp;
  transform?: string | Transform;
  symbol?: FaSymbol;
  // @TODO: what should this be?
  style?: any;
}

function classList (props: Props): string[] {
  const classes = {
    'fa-spin': props.spin,
    'fa-pulse': props.pulse,
    'fa-fw': props.fixedWidth,
    'fa-border': props.border,
    'fa-li': props.listItem,
    'fa-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
    'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both',
    [`fa-${props.size}`]: props.size !== null,
    [`fa-rotate-${props.rotate}`]: props.rotate !== null,
    [`fa-pull-${props.pull}`]: props.pull !== null
  };

  return Object.keys(classes)
    .map(key => classes[key] ? key : null)
    .filter(key => key);
}

@Component({
  selector: 'fa-icon',
  template: ``
})
export class FaIconComponent implements OnChanges {
  @Input() icon: IconProp;
  @Input() mask ?: IconProp;
  @Input() symbol ?: FaSymbol;
  @Input() className ?: string;
  @Input() fixedWidth ?: boolean;
  @Input() spin ?: boolean;
  @Input() pulse ?: boolean;
  @Input() border ?: boolean;
  @Input() listItem ?: boolean;
  @Input() flip ?: FlipProp;
  @Input() size ?: SizeProp;
  @Input() rotate ?: RotateProp;
  @Input() pull ?: PullProp;
  @Input() transform ?: Transform;

  @HostBinding('innerHTML') renderedIconHTML: SafeHtml;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    const iconSpec = normalizeIconArgs(this.icon);
    const classOpts: Props = {
      icon: null,
      spin: this.spin,
      pulse: this.pulse,
      fixedWidth: this.fixedWidth,
      border: this.border,
      listItem: this.listItem,
      flip: this.flip,
      size: this.size || null,
      rotate: this.rotate || null,
      pull: this.pull || null
    };
    const classes = objectWithKey('classes', [...classList(classOpts), ...(this.className || '').split(' ')]);
    const transform = objectWithKey('transform', (typeof this.transform === 'string') ?
      parse.transform(this.transform) : this.transform);
    const mask = objectWithKey('mask', normalizeIconArgs(this.mask));

    const renderedIcon = icon(iconSpec, {
      ...classes,
      ...transform,
      ...mask,
      symbol: this.symbol
    });

    // @TODO: make sure that it doesn't break things to do html[0] here.
    this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(renderedIcon.html[0]);
  }
}
