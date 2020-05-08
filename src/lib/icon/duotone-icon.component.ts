import { Component, Input } from '@angular/core';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';
import { FaIconComponent } from './icon.component';

@Component({
  selector: 'fa-duotone-icon',
  template: ``,
})
export class FaDuotoneIconComponent extends FaIconComponent {
  /**
   * Swap the default opacity of each duotone icon’s layers. This will make an
   * icon’s primary layer have the default opacity of 40% rather than its
   * secondary layer.
   *
   * @default false
   */
  @Input() swapOpacity?: 'true' | 'false' | boolean;

  /**
   * Customize the opacity of the primary icon layer.
   * Valid values are in range [0, 1.0].
   *
   * @default 1.0
   */
  @Input() primaryOpacity?: string | number;

  /**
   * Customize the opacity of the secondary icon layer.
   * Valid values are in range [0, 1.0].
   *
   * @default 0.4
   */
  @Input() secondaryOpacity?: string | number;

  /**
   * Customize the color of the primary icon layer.
   * Accepts any valid CSS color value.
   *
   * @default CSS inherited color
   */
  @Input() primaryColor?: string;

  /**
   * Customize the color of the secondary icon layer.
   * Accepts any valid CSS color value.
   *
   * @default CSS inherited color
   */
  @Input() secondaryColor?: string;

  protected findIconDefinition(i: IconProp | IconDefinition): IconDefinition | null {
    const definition = super.findIconDefinition(i);

    if (definition != null && !Array.isArray(definition.icon[4])) {
      throw new Error(
        'The specified icon does not appear to be a Duotone icon. ' +
          'Check that you specified the correct style: ' +
          `<fa-duotone-icon [icon]="['fad', '${definition.iconName}']"></fa-duotone-icon> ` +
          `or use: <fa-icon icon="${definition.iconName}"></fa-icon> instead.`,
      );
    }

    return definition;
  }

  protected buildParams() {
    const params = super.buildParams();

    if (this.swapOpacity === true || this.swapOpacity === 'true') {
      params.classes.push('fa-swap-opacity');
    }
    if (this.primaryOpacity != null) {
      params.styles['--fa-primary-opacity'] = this.primaryOpacity.toString();
    }
    if (this.secondaryOpacity != null) {
      params.styles['--fa-secondary-opacity'] = this.secondaryOpacity.toString();
    }
    if (this.primaryColor != null) {
      params.styles['--fa-primary-color'] = this.primaryColor;
    }
    if (this.secondaryColor != null) {
      params.styles['--fa-secondary-color'] = this.secondaryColor;
    }

    return params;
  }
}
