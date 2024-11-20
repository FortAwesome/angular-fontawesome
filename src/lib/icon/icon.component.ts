import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, inject, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  FaSymbol,
  FlipProp,
  icon,
  IconDefinition as CoreIconDefinition,
  IconParams,
  parse,
  PullProp,
  RotateProp,
  SizeProp,
  Styles,
  Transform,
} from '@fortawesome/fontawesome-svg-core';
import { FaConfig } from '../config';
import { FaIconLibrary } from '../icon-library';
import { faWarnIfIconDefinitionMissing } from '../shared/errors/warn-if-icon-html-missing';
import { faWarnIfIconSpecMissing } from '../shared/errors/warn-if-icon-spec-missing';
import { AnimationProp, FaProps } from '../shared/models/props.model';
import { faClassList, isKnownRotateValue } from '../shared/utils/classlist.util';
import { ensureCss } from '../shared/utils/css';
import { faNormalizeIconSpec } from '../shared/utils/normalize-icon-spec.util';
import { FaStackItemSizeDirective } from '../stack/stack-item-size.directive';
import { FaStackComponent } from '../stack/stack.component';
import { IconDefinition, IconProp } from '../types';

@Component({
  selector: 'fa-icon',
  template: ``,
  host: {
    class: 'ng-fa-icon',
    '[attr.title]': 'title',
  },
})
export class FaIconComponent implements OnChanges {
  @Input() icon: IconProp;

  /**
   * Specify a title for the icon.
   *
   * This text will be displayed in a tooltip on hover and presented to the
   * screen readers.
   */
  @Input() title?: string;

  /**
   * Icon animation.
   *
   * Most of the animations are only available when using Font Awesome 6. With
   * Font Awesome 5, only 'spin' and 'spin-pulse' are supported.
   */
  @Input() animation?: AnimationProp;

  @Input() mask?: IconProp;
  @Input() flip?: FlipProp;
  @Input() size?: SizeProp;
  @Input() pull?: PullProp;
  @Input() border?: boolean;
  @Input() inverse?: boolean;
  @Input() symbol?: FaSymbol;
  @Input() rotate?: RotateProp | string;
  @Input() fixedWidth?: boolean;
  @Input() transform?: string | Transform;

  /**
   * Specify the `role` attribute for the rendered <svg> element.
   *
   * @default 'img'
   */
  @Input() a11yRole: string;

  @HostBinding('innerHTML') renderedIconHTML: SafeHtml;

  private document = inject(DOCUMENT);

  constructor(
    private sanitizer: DomSanitizer,
    private config: FaConfig,
    private iconLibrary: FaIconLibrary,
    @Optional() private stackItem: FaStackItemSizeDirective,
    @Optional() stack: FaStackComponent,
  ) {
    if (stack != null && stackItem == null) {
      console.error(
        'FontAwesome: fa-icon and fa-duotone-icon elements must specify stackItemSize attribute when wrapped into ' +
          'fa-stack. Example: <fa-icon stackItemSize="2x"></fa-icon>.',
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.icon == null && this.config.fallbackIcon == null) {
      faWarnIfIconSpecMissing();
      return;
    }

    if (changes) {
      const iconDefinition = this.findIconDefinition(this.icon ?? this.config.fallbackIcon);
      if (iconDefinition != null) {
        const params = this.buildParams();
        ensureCss(this.document, this.config);
        const renderedIcon = icon(iconDefinition, params);
        this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(renderedIcon.html.join('\n'));
      }
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

  protected findIconDefinition(i: IconProp | IconDefinition): CoreIconDefinition | null {
    const lookup = faNormalizeIconSpec(i, this.config.defaultPrefix);
    if ('icon' in lookup) {
      return lookup as CoreIconDefinition;
    }

    const definition = this.iconLibrary.getIconDefinition(lookup.prefix, lookup.iconName);
    if (definition != null) {
      return definition as CoreIconDefinition;
    }

    faWarnIfIconDefinitionMissing(lookup);
    return null;
  }

  protected buildParams(): IconParams {
    const classOpts: FaProps = {
      flip: this.flip,
      animation: this.animation,
      border: this.border,
      inverse: this.inverse,
      size: this.size || null,
      pull: this.pull || null,
      rotate: this.rotate || null,
      fixedWidth: typeof this.fixedWidth === 'boolean' ? this.fixedWidth : this.config.fixedWidth,
      stackItemSize: this.stackItem != null ? this.stackItem.stackItemSize : null,
    };

    const parsedTransform = typeof this.transform === 'string' ? parse.transform(this.transform) : this.transform;

    const styles: Styles = {};
    if (classOpts.rotate != null && !isKnownRotateValue(classOpts.rotate)) {
      styles['--fa-rotate-angle'] = `${classOpts.rotate}`;
    }

    return {
      title: this.title,
      transform: parsedTransform,
      classes: faClassList(classOpts),
      mask: this.mask != null ? this.findIconDefinition(this.mask) : null,
      symbol: this.symbol,
      attributes: {
        role: this.a11yRole,
      },
      styles,
    };
  }
}
