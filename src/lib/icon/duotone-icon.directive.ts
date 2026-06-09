import { Directive, input, model } from '@angular/core';
import { IconDefinition as CoreIconDefinition, IconParams } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition, IconProp } from '../types';
import { FaIconDirective } from './icon.directive';

@Directive({
  selector: '[faDuotoneIcon]',
})
export class FaDuotoneIconDirective extends FaIconDirective {
  override readonly faIcon = model<IconProp | undefined>(undefined, { alias: 'faDuotoneIcon' });
  /**
   * Swap the default opacity of each duotone icon’s layers. This will make an
   * icon’s primary layer have the default opacity of 40% rather than its
   * secondary layer.
   *
   * @default false
   */
  readonly swapOpacity = input<'true' | 'false' | boolean>();

  /**
   * Customize the opacity of the primary icon layer.
   * Valid values are in range [0, 1.0].
   *
   * @default 1.0
   */
  readonly primaryOpacity = input<string | number>();

  /**
   * Customize the opacity of the secondary icon layer.
   * Valid values are in range [0, 1.0].
   *
   * @default 0.4
   */
  readonly secondaryOpacity = input<string | number>();

  /**
   * Customize the color of the primary icon layer.
   * Accepts any valid CSS color value.
   *
   * @default CSS inherited color
   */
  readonly primaryColor = input<string>();

  /**
   * Customize the color of the secondary icon layer.
   * Accepts any valid CSS color value.
   *
   * @default CSS inherited color
   */
  readonly secondaryColor = input<string>();

  protected override findIconDefinition(i: IconProp | IconDefinition): CoreIconDefinition | null {
    const definition = super.findIconDefinition(i);

    if (definition != null && !Array.isArray(definition.icon[4])) {
      throw new Error(
        'The specified icon does not appear to be a Duotone icon. ' +
          'Check that you specified the correct style: ' +
          `<fa-duotone-icon [icon]="['fad', '${definition.iconName}']" /> ` +
          `or use: <fa-icon icon="${definition.iconName}" /> instead.`,
      );
    }

    return definition;
  }

  protected override buildParams(): IconParams {
    const params = super.buildParams();

    const swapOpacity = this.swapOpacity();
    if (swapOpacity === true || swapOpacity === 'true') {
      if (Array.isArray(params.classes)) {
        params.classes.push('fa-swap-opacity');
      } else if (typeof params.classes === 'string') {
        params.classes = [params.classes, 'fa-swap-opacity'];
      } else {
        params.classes = ['fa-swap-opacity'];
      }
    }

    if (params.styles == null) {
      params.styles = {};
    }
    const primaryOpacity = this.primaryOpacity();
    if (primaryOpacity != null) {
      params.styles['--fa-primary-opacity'] = primaryOpacity.toString();
    }
    const secondaryOpacity = this.secondaryOpacity();
    if (secondaryOpacity != null) {
      params.styles['--fa-secondary-opacity'] = secondaryOpacity.toString();
    }
    const primaryColor = this.primaryColor();
    if (primaryColor != null) {
      params.styles['--fa-primary-color'] = primaryColor;
    }
    const secondaryColor = this.secondaryColor();
    if (secondaryColor != null) {
      params.styles['--fa-secondary-color'] = secondaryColor;
    }

    return params;
  }
}
