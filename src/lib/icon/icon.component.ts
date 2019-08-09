import { Component, HostBinding, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  FaSymbol,
  FlipProp,
  icon,
  IconLookup,
  IconParams,
  IconProp,
  parse,
  PullProp,
  RotateProp,
  SizeProp,
  Styles,
  Transform
} from '@fortawesome/fontawesome-svg-core';
import { faNotFoundIconHtml } from '../shared/errors/not-found-icon-html';
import { faWarnIfIconHtmlMissing } from '../shared/errors/warn-if-icon-html-missing';
import { faWarnIfIconSpecMissing } from '../shared/errors/warn-if-icon-spec-missing';
import { FaProps } from '../shared/models/props.model';
import { faClassList } from '../shared/utils/classlist.util';

import { faNormalizeIconSpec } from '../shared/utils/normalize-icon-spec.util';
import { FaStackItemSizeDirective } from '../stack/stack-item-size.directive';
import { FaIconService } from './icon.service';

@Component({
  selector: 'fa-icon',
  template: ``,
  host: {
    class: 'ng-fa-icon',
  }
})
export class FaIconComponent implements OnChanges {
  @Input() icon: IconProp;
  @Input() title?: string;
  @Input() spin?: boolean;
  @Input() pulse?: boolean;
  @Input() mask?: IconProp;
  @Input() styles?: Styles;
  @Input() flip?: FlipProp;
  @Input() size?: SizeProp;
  @Input() pull?: PullProp;
  @Input() border?: boolean;
  @Input() inverse?: boolean;
  @Input() symbol?: FaSymbol;
  @Input() listItem?: boolean;
  @Input() rotate?: RotateProp;
  @Input() fixedWidth?: boolean;
  @Input() classes?: string[] = [];
  @Input() transform?: string | Transform;

  /**
   * Specify the `role` attribute for the rendered <svg> element.
   *
   * @default 'img'
   */
  @Input() a11yRole: string;

  /**
   * @deprecated Since 0.5.0. Will be removed in 0.6.0. Use `icon` property directly.
   */
  get iconProp(): IconProp {
    return this.icon;
  }

  /**
   * @deprecated Since 0.5.0. Will be removed in 0.6.0. Use `icon` property directly.
   */
  set iconProp(value: IconProp) {
    this.icon = value;
  }

  @HostBinding('innerHTML')
  public renderedIconHTML: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private iconService: FaIconService,
    @Optional() private stackItem: FaStackItemSizeDirective,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.icon == null) {
      faWarnIfIconSpecMissing();
    }

    if (changes) {
      const normalizedIcon = this.normalizeIcon();
      const params = this.buildParams();
      this.renderIcon(normalizedIcon, params);
    }
  }

  /**
   * Programmatically trigger rendering of the icon.
   *
   * This method is useful, when creating {@link FaIconComponent} dynamically or
   * changing its inputs programmatically as in these cases icon won't be
   * re-rendered automatically.
   */
  render() {
    this.ngOnChanges({});
  }

  protected normalizeIcon() {
    return faNormalizeIconSpec(this.icon, this.iconService.defaultPrefix);
  }

  protected buildParams() {
    const classOpts: FaProps = {
      flip: this.flip,
      spin: this.spin,
      pulse: this.pulse,
      border: this.border,
      inverse: this.inverse,
      listItem: this.listItem,
      size: this.size || null,
      pull: this.pull || null,
      rotate: this.rotate || null,
      fixedWidth: this.fixedWidth,
      stackItemSize: this.stackItem != null ? this.stackItem.stackItemSize : null,
    };

    const parsedTransform = typeof this.transform === 'string' ? parse.transform(this.transform) : this.transform;

    return {
      title: this.title,
      transform: parsedTransform,
      classes: [...faClassList(classOpts), ...this.classes],
      mask: faNormalizeIconSpec(this.mask, this.iconService.defaultPrefix),
      styles: this.styles != null ? this.styles : {},
      symbol: this.symbol,
      attributes: {
        role: this.a11yRole
      }
    };
  }

  private renderIcon(iconLookup: IconLookup, params: IconParams) {
    const renderedIcon = icon(iconLookup, params);

    faWarnIfIconHtmlMissing(renderedIcon, iconLookup);

    this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(
      renderedIcon ? renderedIcon.html.join('\n') : faNotFoundIconHtml
    );
  }
}

