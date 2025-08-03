import { ChangeDetectionStrategy, Component, computed, DOCUMENT, inject, model } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  Attributes,
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
    '[attr.title]': 'title() ?? undefined',
    '[innerHTML]': 'renderedIconHTML()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaIconComponent {
  readonly icon = model<IconProp>();

  /**
   * Specify a title for the icon.
   *
   * This text will be displayed in a tooltip on hover and presented to the
   * screen readers.
   */
  readonly title = model<string>();

  /**
   * Icon animation.
   *
   * Most of the animations are only available when using Font Awesome 6. With
   * Font Awesome 5, only 'spin' and 'spin-pulse' are supported.
   */
  readonly animation = model<AnimationProp>();

  readonly mask = model<IconProp>();
  readonly flip = model<FlipProp>();
  readonly size = model<SizeProp>();
  readonly pull = model<PullProp>();
  readonly border = model<boolean>();
  readonly inverse = model<boolean>();
  readonly symbol = model<FaSymbol>();
  readonly rotate = model<RotateProp | string>();
  readonly fixedWidth = model<boolean>();
  readonly transform = model<string | Transform>();

  /**
   * Specify the `role` attribute for the rendered <svg> element.
   *
   * @default 'img'
   */
  readonly a11yRole = model<string>();

  readonly renderedIconHTML = computed(() => {
    const iconValue = this.icon() ?? this.config.fallbackIcon;
    if (!iconValue) {
      faWarnIfIconSpecMissing();
      return '';
    }

    const iconDefinition = this.findIconDefinition(iconValue);
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
          'fa-stack. Example: <fa-icon stackItemSize="2x" />.',
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
      size: this.size(),
      pull: this.pull(),
      rotate: this.rotate(),
      fixedWidth: typeof fixedWidth === 'boolean' ? fixedWidth : this.config.fixedWidth,
      stackItemSize: this.stackItem != null ? this.stackItem.stackItemSize() : undefined,
    };

    const transform = this.transform();
    const parsedTransform = typeof transform === 'string' ? parse.transform(transform) : transform;

    const mask = this.mask();
    const maskIconDefinition = mask != null ? this.findIconDefinition(mask) : null;

    const attributes: Attributes = {};
    const a11yRole = this.a11yRole();
    if (a11yRole != null) {
      attributes['role'] = a11yRole;
    }

    const styles: Styles = {};
    if (classOpts.rotate != null && !isKnownRotateValue(classOpts.rotate)) {
      styles['--fa-rotate-angle'] = `${classOpts.rotate}`;
    }

    return {
      title: this.title(),
      transform: parsedTransform,
      classes: faClassList(classOpts),
      mask: maskIconDefinition ?? undefined,
      symbol: this.symbol(),
      attributes,
      styles,
    };
  }
}
