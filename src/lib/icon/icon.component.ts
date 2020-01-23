import { Component, HostBinding, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  FaSymbol,
  findIconDefinition,
  FlipProp,
  icon,
  IconDefinition,
  IconParams,
  IconProp,
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
import { FaProps } from '../shared/models/props.model';
import { faClassList } from '../shared/utils/classlist.util';
import { faNormalizeIconSpec } from '../shared/utils/normalize-icon-spec.util';
import { FaStackItemSizeDirective } from '../stack/stack-item-size.directive';

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
   * This text will be displayed in a tooltip on hover and presented to the
   * screen readers.
   */
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

  @HostBinding('innerHTML') renderedIconHTML: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private config: FaConfig,
    private iconLibrary: FaIconLibrary,
    @Optional() private stackItem: FaStackItemSizeDirective,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.icon == null && this.config.fallbackIcon == null) {
      return faWarnIfIconSpecMissing();
    }

    let iconToBeRendered: IconProp = null;
    if (this.icon == null) {
      iconToBeRendered = this.config.fallbackIcon;
    } else {
      iconToBeRendered = this.icon;
    }

    if (changes) {
      const iconDefinition = this.findIconDefinition(iconToBeRendered);
      if (iconDefinition != null) {
        const params = this.buildParams();
        this.renderIcon(iconDefinition, params);
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

  protected findIconDefinition(i: IconProp | IconDefinition): IconDefinition | null {
    const lookup = faNormalizeIconSpec(i, this.config.defaultPrefix);
    if ('icon' in lookup) {
      return lookup;
    }

    const definition = this.iconLibrary.getIconDefinition(lookup.prefix, lookup.iconName);
    if (definition != null) {
      return definition;
    }

    const globalDefinition = findIconDefinition(lookup);
    if (globalDefinition != null) {
      const message =
        'Global icon library is deprecated. ' +
        'Consult https://github.com/FortAwesome/angular-fontawesome/blob/master/UPGRADING.md ' +
        'for the migration instructions.';
      if (this.config.globalLibrary === 'unset') {
        console.error('FontAwesome: ' + message);
      } else if (!this.config.globalLibrary) {
        throw new Error(message);
      }

      return globalDefinition;
    }

    faWarnIfIconDefinitionMissing(lookup);
    return null;
  }

  protected buildParams() {
    const classOpts: FaProps = {
      flip: this.flip,
      spin: this.spin,
      pulse: this.pulse,
      border: this.border,
      inverse: this.inverse,
      size: this.size || null,
      pull: this.pull || null,
      rotate: this.rotate || null,
      fixedWidth: typeof this.fixedWidth === 'boolean' ? this.fixedWidth : this.config.fixedWidth,
      stackItemSize: this.stackItem != null ? this.stackItem.stackItemSize : null,
    };

    const parsedTransform = typeof this.transform === 'string' ? parse.transform(this.transform) : this.transform;

    return {
      title: this.title,
      transform: parsedTransform,
      classes: [...faClassList(classOpts), ...this.classes],
      mask: this.mask != null ? this.findIconDefinition(this.mask) : null,
      styles: this.styles != null ? this.styles : {},
      symbol: this.symbol,
      attributes: {
        role: this.a11yRole,
      },
    };
  }

  private renderIcon(definition: IconDefinition, params: IconParams) {
    const renderedIcon = icon(definition, params);
    this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(renderedIcon.html.join('\n'));
  }
}
