import {Component, Input, SimpleChanges, OnChanges} from '@angular/core';
import { HostBinding } from '@angular/core';
import fontawesome from '@fortawesome/fontawesome';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

function normalizeIconArgs (icon) {
  if (icon === null) {
    return null;
  }

  if (typeof icon === 'object' && icon.prefix && icon.iconName) {
    return icon;
  }

  if (Array.isArray(icon) && icon.length === 2) {
    return { prefix: icon[0], iconName: icon[1] };
  }

  if (typeof icon === 'string') {
    return { prefix: 'fas', iconName: icon };
  }
}

function objectWithKey (key, value) {
  return ((Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value)) ? {[key]: value} : {};
}

function classList (props) {
  const classes = {
    'fa-spin': props.spin,
    'fa-pulse': props.pulse,
    'fa-fw': props.fixedWidth,
    'fa-border': props.border,
    'fa-li': props.listItem,
    'fa-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
    'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both',
    [`fa-${props.size}`]: props.size !== null,
    [`fa-rotate-${props.rotation}`]: props.rotation !== null,
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
  @Input() icon: any;
  @Input() mask ?: any;
  @Input() symbol ?: any;
  @Input() className ?: any;
  @Input() fixedWidth ?: boolean;
  @Input() spin ?: boolean;
  @Input() pulse ?: boolean;
  @Input() border ?: boolean;
  @Input() listItem ?: boolean;
  @Input() flip ?: string;
  @Input() size ?: string;
  @Input() rotation ?: any;
  @Input() pull ?: any;
  @Input() transform ?: any;

  @HostBinding('innerHTML') renderedIconHTML: SafeHtml;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    const icon = normalizeIconArgs(this.icon);
    const classOpts = {
      spin: typeof this.spin !== 'undefined',
      pulse: typeof this.pulse !== 'undefined',
      fixedWidth: typeof this.fixedWidth !== 'undefined',
      border: typeof this.border !== 'undefined',
      listItem: typeof this.listItem !== 'undefined',
      flip: this.flip,
      size: this.size || null,
      rotation: this.rotation || null,
      pull: this.pull || null
    };
    const classes = objectWithKey('classes', [...classList(classOpts), ...(this.className || '').split(' ')]);
    const transform = objectWithKey('transform', (typeof this.transform === 'string') ?
      fontawesome.parse.transform(this.transform) : this.transform);
    const mask = objectWithKey('mask', normalizeIconArgs(this.mask));

    const renderedIcon = fontawesome.icon(icon, {
      ...classes,
      ...transform,
      ...mask,
      symbol: this.symbol
    });

    this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(renderedIcon.html);
  }
}
