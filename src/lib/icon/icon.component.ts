import { Component, ElementRef, Host, HostBinding, Input, OnChanges, Optional, Renderer2, SimpleChanges } from '@angular/core';
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
import { FaStackComponent } from '../stack/stack.component';
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
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Host() @Optional() private stackParent: FaStackComponent
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (this.stackParent != null && this.size != null) {
        this.renderer.addClass(this.elementRef.nativeElement, `fa-stack-${this.size}`);
      }
      const normalizedIcon = this.normalizeIcon();
      const params = this.buildParams();
      this.renderIcon(normalizedIcon, params);
    }
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
    };

    const parsedTransform = typeof this.transform === 'string' ? parse.transform(this.transform) : this.transform;

    return {
      title: this.title,
      transform: parsedTransform,
      classes: [...faClassList(classOpts, this.stackParent != null), ...this.classes],
      mask: faNormalizeIconSpec(this.mask, this.iconService.defaultPrefix),
      styles: this.styles,
      symbol: this.symbol
    };
  }

  private renderIcon(iconLookup: IconLookup, params: IconParams) {
    const renderedIcon = icon(iconLookup, params);

    faWarnIfIconSpecMissing(iconLookup);
    faWarnIfIconHtmlMissing(renderedIcon, iconLookup);

    this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(
      renderedIcon ? renderedIcon.html.join('\n') : faNotFoundIconHtml
    );
  }
}

