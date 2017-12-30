import {Component, Input, SimpleChanges, OnChanges} from '@angular/core';
import { HostBinding } from '@angular/core';
import { FontawesomeService } from '../service/fontawesome.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  FlipProp,
  SizeProp,
  IconProp,
  PullProp,
  RotateProp,
  Transform,
  IconLookup,
  FaSymbol } from '@fortawesome/fontawesome';

function isIconLookup(i: IconProp): i is IconLookup {
  return (<IconLookup>i).prefix !== undefined && (<IconLookup>i).iconName !== undefined;
}

function normalizeIconArgs (icon: IconProp): IconLookup {
  if (typeof icon === 'undefined' || icon === null) {
    return null;
  }

  if (isIconLookup(icon)) {
    return icon;
  }

  if (Array.isArray(icon) && icon.length === 2) {
    return { prefix: icon[0], iconName: icon[1] };
  }

  if (typeof icon === 'string') {
    return { prefix: 'fas', iconName: icon };
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
  constructor(private sanitizer: DomSanitizer, private fontawesome: FontawesomeService) {}

  ngOnChanges(changes: SimpleChanges) {
    const icon = normalizeIconArgs(this.icon);
    const classOpts: Props = {
      icon: null,
      spin: typeof this.spin !== 'undefined',
      pulse: typeof this.pulse !== 'undefined',
      fixedWidth: typeof this.fixedWidth !== 'undefined',
      border: typeof this.border !== 'undefined',
      listItem: typeof this.listItem !== 'undefined',
      flip: this.flip,
      size: this.size || null,
      rotate: this.rotate || null,
      pull: this.pull || null
    };
    const classes = objectWithKey('classes', [...classList(classOpts), ...(this.className || '').split(' ')]);
    const transform = objectWithKey('transform', (typeof this.transform === 'string') ?
      this.fontawesome.parse.transform(this.transform) : this.transform);
    const mask = objectWithKey('mask', normalizeIconArgs(this.mask));

    const renderedIcon = this.fontawesome.icon(icon, {
      ...classes,
      ...transform,
      ...mask,
      symbol: this.symbol
    });

    this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(renderedIcon.html);
  }
}
