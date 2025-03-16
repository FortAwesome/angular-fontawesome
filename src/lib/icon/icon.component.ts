import { DOCUMENT } from '@angular/common';
import { Component, inject, input, computed } from '@angular/core';
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
    '[attr.title]': 'title()',
    '[innerHTML]': 'renderedIconHTML()',
  },
})
export class FaIconComponent {
  readonly icon = input.required<IconProp>();

  /**
   * Specify a title for the icon.
   *
   * This text will be displayed in a tooltip on hover and presented to the
   * screen readers.
   */
  readonly title = input<string>();

  /**
   * Icon animation.
   *
   * Most of the animations are only available when using Font Awesome 6. With
   * Font Awesome 5, only 'spin' and 'spin-pulse' are supported.
   */
  readonly animation = input<AnimationProp>();

  readonly mask = input<IconProp>();
  readonly flip = input<FlipProp>();
  readonly size = input<SizeProp>();
  readonly pull = input<PullProp>();
  readonly border = input<boolean>();
  readonly inverse = input<boolean>();
  readonly symbol = input<FaSymbol>();
  readonly rotate = input<RotateProp | string>();
  readonly fixedWidth = input<boolean>();
  readonly transform = input<string | Transform>();

  /**
   * Specify the `role` attribute for the rendered <svg> element.
   *
   * @default 'img'
   */
  readonly a11yRole = input<string>();

  renderedIconHTML = computed<SafeHtml | ''>(() => {
    const iconValue = this.icon();
    if (iconValue == null && this.config.fallbackIcon == null) {
      faWarnIfIconSpecMissing();
      return '';
    }

    const iconDefinition = this.findIconDefinition(iconValue ?? this.config.fallbackIcon);
    if (!iconDefinition) {
      return '';
    }
    const params = this.buildParams();
    ensureCss(this.document, this.config);
    const renderedIcon = icon(iconDefinition, params);
    return this.sanitizer.bypassSecurityTrustHtml(renderedIcon.html.join('\n'));
  });

  private readonly document = inject(DOCUMENT);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly config = inject(FaConfig);
  private readonly iconLibrary = inject(FaIconLibrary);
  private readonly stackItem = inject(FaStackItemSizeDirective, { optional: true });
  private readonly stack = inject(FaStackComponent, { optional: true });

  constructor() {
    if (this.stack != null && this.stackItem == null) {
      console.error(
        'FontAwesome: fa-icon and fa-duotone-icon elements must specify stackItemSize attribute when wrapped into ' +
          'fa-stack. Example: <fa-icon stackItemSize="2x"></fa-icon>.',
      );
    }
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
    const fixedWidth = this.fixedWidth();
    const classOpts: FaProps = {
      flip: this.flip(),
      animation: this.animation(),
      border: this.border(),
      inverse: this.inverse(),
      size: this.size() || null,
      pull: this.pull() || null,
      rotate: this.rotate() || null,
      fixedWidth: typeof fixedWidth === 'boolean' ? fixedWidth : this.config.fixedWidth,
      stackItemSize: this.stackItem != null ? this.stackItem.stackItemSize() : null,
    };

    const transform = this.transform();
    const parsedTransform = typeof transform === 'string' ? parse.transform(transform) : transform;

    const styles: Styles = {};
    if (classOpts.rotate != null && !isKnownRotateValue(classOpts.rotate)) {
      styles['--fa-rotate-angle'] = `${classOpts.rotate}`;
    }

    return {
      title: this.title(),
      transform: parsedTransform,
      classes: faClassList(classOpts),
      mask: this.mask() != null ? this.findIconDefinition(this.mask()) : null,
      symbol: this.symbol(),
      attributes: {
        role: this.a11yRole(),
      },
      styles,
    };
  }
}
