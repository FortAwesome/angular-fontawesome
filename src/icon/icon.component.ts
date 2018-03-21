import {
  Input,
  OnChanges,
  Component,
  HostBinding,
  SimpleChanges
} from '@angular/core';
import {
  icon,
  Icon,
  parse,
  Styles,
  PullProp,
  IconProp,
  SizeProp,
  FlipProp,
  FaSymbol,
  Transform,
  IconParams,
  IconLookup,
  RotateProp
} from '@fortawesome/fontawesome';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { faNotFoundIconHtml, faWarnIfIconHtmlMissing, faWarnIfIconSpecMissing} from '../shared/errors';
import { objectWithKey, faClassList, faNormalizeIconSpec } from '../shared/utils';
import { FaProps } from '../shared/models';

/**
 * Fontawesome icon.
 */
@Component({
  selector: 'fa-icon',
  template: ``
})
export class FaIconComponent implements OnChanges {
  public icon: Icon;

  constructor(private sanitizer: DomSanitizer) {}

  @HostBinding('class.ng-fa-icon')
  private cssClass = true;

  @HostBinding('innerHTML')
  private renderedIconHTML: SafeHtml;

  private params: IconParams;
  private iconSpec: IconLookup;

  @Input('icon') private iconProp: IconProp;
  @Input() private title: string;
  @Input() private spin?: boolean;
  @Input() private pulse?: boolean;
  @Input() private mask?: IconProp;
  @Input() private styles?: Styles;
  @Input() private flip?: FlipProp;
  @Input() private size?: SizeProp;
  @Input() private pull?: PullProp;
  @Input() private border?: boolean;
  @Input() private inverse?: boolean;
  @Input() private symbol?: FaSymbol;
  @Input() private listItem?: boolean;
  @Input() private rotate?: RotateProp;
  @Input() private fixedWidth?: boolean;
  @Input() private classes?: string[] = [];
  @Input() private transform?: string | Transform;

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.updateIconSpec();
      this.updateParams();
      this.updateIcon();
      this.renderIcon();
    }
  }

  /**
   * Updating icon spec.
   */
  private updateIconSpec() {
    this.iconSpec = faNormalizeIconSpec(this.iconProp);
  }

  /**
   * Updating params by component props.
   */
  private updateParams() {
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
      fixedWidth: this.fixedWidth
    };

    const classes = objectWithKey('classes', [...faClassList(classOpts), ...this.classes]);
    const mask = objectWithKey('mask', faNormalizeIconSpec(this.mask));
    const parsedTransform = typeof this.transform === 'string' ? parse.transform(this.transform) : this.transform;
    const transform = objectWithKey('transform', parsedTransform);

    this.params = {
      title: this.title,
      ...transform,
      ...classes,
      ...mask,
      styles: this.styles,
      symbol: this.symbol
    };
  }

  /**
   * Updating icon by params and icon spec.
   */
  private updateIcon() {
    this.icon = icon(this.iconSpec, this.params);
  }

  /**
   * Rendering icon.
   */
  private renderIcon() {
    faWarnIfIconSpecMissing(this.iconSpec);
    faWarnIfIconHtmlMissing(this.icon, this.iconSpec);

    this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(
      this.icon ? this.icon.html[0] : faNotFoundIconHtml
    );
  }
}

