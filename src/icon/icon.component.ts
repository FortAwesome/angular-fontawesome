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
} from '@fortawesome/fontawesome-svg-core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { faNormalizeIconSpec } from '../shared/utils/normalize-icon-spec.util';
import { FaProps } from '../shared/models/props.model';
import { objectWithKey } from '../shared/utils/object-with-keys.util';
import { faClassList } from '../shared/utils/classlist.util';
import { faWarnIfIconHtmlMissing } from '../shared/errors/warn-if-icon-html-missing';
import { faWarnIfIconSpecMissing } from '../shared/errors/warn-if-icon-spec-missing';
import { faNotFoundIconHtml } from '../shared/errors/not-found-icon-html';

/**
 * Fontawesome icon.
 */
@Component({
  selector: 'fa-icon',
  template: ``,
  host: {
    class: 'ng-fa-icon',
  }
})
export class FaIconComponent implements OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('icon') iconProp: IconProp;
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

  public icon: Icon;

  @HostBinding('innerHTML')
  public renderedIconHTML: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  private params: IconParams;
  private iconSpec: IconLookup;

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
      this.icon ? this.icon.html.join('\n') : faNotFoundIconHtml
    );
  }
}

