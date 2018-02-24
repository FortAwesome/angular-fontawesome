import {
  Input,
  OnChanges,
  Component,
  HostBinding,
  SimpleChanges,
  ChangeDetectionStrategy
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

import { objectWithKey, faClassList, faNormalizeIconSpec } from '../shared/utils';
import { faNotFoundIconHtml, faThrowIfIconHtmlMissing, faThrowIfIconSpecMissing} from '../shared/errors';
import { FaProps } from '../shared/models';

/**
 * Fontawesome icon.
 */
@Component({
  selector: 'fa-icon',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
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
  @Input() private mask?: IconProp;
  @Input() private symbol?: FaSymbol;
  @Input() private classes?: string[] = [];
  @Input() private styles?: Styles;
  @Input() private fixedWidth?: boolean;
  @Input() private spin?: boolean;
  @Input() private pulse?: boolean;
  @Input() private border?: boolean;
  @Input() private listItem?: boolean;
  @Input() private inverse?: boolean;
  @Input() private flip?: FlipProp;
  @Input() private size?: SizeProp;
  @Input() private rotate?: RotateProp;
  @Input() private pull?: PullProp;
  @Input() private transform?: string | Transform;

  ngOnChanges(changes: SimpleChanges) {
    this.updateIconSpec();
    this.updateParams();
    this.updateIcon();
    this.renderIcon();
  }

  /**
   * Updates icon spec.
   */
  private updateIconSpec() {
    this.iconSpec = faNormalizeIconSpec(this.iconProp);
  }

  /**
   * Updates params by component props.
   */
  private updateParams() {
    const classOpts: FaProps = {
      spin: this.spin,
      pulse: this.pulse,
      fixedWidth: this.fixedWidth,
      border: this.border,
      listItem: this.listItem,
      flip: this.flip,
      inverse: this.inverse,
      size: this.size || null,
      rotate: this.rotate || null,
      pull: this.pull || null
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
   * Updates icon by params and icon spec.
   */
  private updateIcon() {
    this.icon = icon(this.iconSpec, this.params);
  }

  private renderIcon() {
    faThrowIfIconSpecMissing(this.iconSpec);
    faThrowIfIconHtmlMissing(this.icon, this.iconSpec);
    this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(this.icon ? this.icon.html[0] : faNotFoundIconHtml);
  }
}






