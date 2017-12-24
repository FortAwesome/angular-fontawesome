import {Component, Input, SimpleChanges, OnChanges} from '@angular/core';
import { HostBinding } from '@angular/core';
import { LibService } from '../service/lib.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

export interface IconArgs {
  prefix: string;
  iconName: string;
}
function normalizeIconArgs (icon: string | IconArgs): IconArgs {
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

function objectWithKey (key: string, value: any) {
  return ((Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value)) ? {[key]: value} : {};
}

export type FaFlip = 'horizontal' | 'vertical' | 'both';
export type FaPull = 'left' | 'right';
export type FaSize = 'xs' | 'lg' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
export type FaRotation = 90 | 180 | 270;
export type FaTransform = string | any;
export type FaClassName = string;
export type FaStyle = any;
export type FaSymbol = boolean | string;
export type FaMask = string | IconArgs;

export interface FaProps {
  icon?: string | IconArgs;
  spin?: boolean;
  pulse?: boolean;
  fixedWidth?: boolean;
  border?: boolean;
  listItem?: boolean;
  flip?: FaFlip ;
  pull?: FaPull;
  size?: FaSize;
  rotation?: FaRotation;
  className?: FaClassName;
  transform?: FaTransform;
  style?: FaStyle;
  symbol?: FaSymbol;
}

function classList (props: FaProps): string[] {
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
  @Input() icon: string | IconArgs;
  @Input() mask ?: string | IconArgs;
  @Input() symbol ?: FaSymbol;
  @Input() className ?: FaClassName;
  @Input() fixedWidth ?: boolean;
  @Input() spin ?: boolean;
  @Input() pulse ?: boolean;
  @Input() border ?: boolean;
  @Input() listItem ?: boolean;
  @Input() flip ?: FaFlip;
  @Input() size ?: FaSize;
  @Input() rotation ?: FaRotation;
  @Input() pull ?: FaPull;
  @Input() transform ?: FaTransform;

  @HostBinding('innerHTML') renderedIconHTML: SafeHtml;
  constructor(private sanitizer: DomSanitizer, private libService: LibService) {}

  ngOnChanges(changes: SimpleChanges) {
    const icon = normalizeIconArgs(this.icon);
    const fontawesome = this.libService.fontawesome;
    const classOpts: FaProps = {
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
