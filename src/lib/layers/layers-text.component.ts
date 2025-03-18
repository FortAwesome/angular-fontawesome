import { DOCUMENT } from '@angular/common';
import { Component, inject, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  FlipProp,
  parse,
  PullProp,
  RotateProp,
  SizeProp,
  Styles,
  text,
  TextParams,
  Transform,
} from '@fortawesome/fontawesome-svg-core';
import { FaConfig } from '../config';
import { faWarnIfParentNotExist } from '../shared/errors/warn-if-parent-not-exist';
import { FaProps } from '../shared/models/props.model';
import { faClassList, isKnownRotateValue } from '../shared/utils/classlist.util';
import { ensureCss } from '../shared/utils/css';
import { FaLayersComponent } from './layers.component';

@Component({
  selector: 'fa-layers-text',
  template: '',
  host: {
    class: 'ng-fa-layers-text',
    '[innerHTML]': 'renderedHTML()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaLayersTextComponent {
  readonly content = input.required<string>();
  readonly title = input<string>();
  readonly flip = input<FlipProp>();
  readonly size = input<SizeProp>();
  readonly pull = input<PullProp>();
  readonly border = input<boolean>();
  readonly inverse = input<boolean>();
  readonly rotate = input<RotateProp | string>();
  readonly fixedWidth = input<boolean>();
  readonly transform = input<string | Transform>();

  readonly renderedHTML = computed(() => {
    const params = this.buildParams();
    return this.updateContent(params);
  });

  private readonly document = inject(DOCUMENT);
  private readonly config = inject(FaConfig);
  private readonly parent = inject(FaLayersComponent, { optional: true });
  private readonly sanitizer = inject(DomSanitizer);

  constructor() {
    faWarnIfParentNotExist(this.parent, 'FaLayersComponent', this.constructor.name);
  }

  /**
   * Updating params by component props.
   */
  protected buildParams(): TextParams {
    const classOpts: FaProps = {
      flip: this.flip(),
      border: this.border(),
      inverse: this.inverse(),
      size: this.size() || null,
      pull: this.pull() || null,
      rotate: this.rotate() || null,
      fixedWidth: this.fixedWidth(),
    };

    const transform = this.transform();
    const parsedTransform = typeof transform === 'string' ? parse.transform(transform) : transform;

    const styles: Styles = {};
    if (classOpts.rotate != null && !isKnownRotateValue(classOpts.rotate)) {
      styles['--fa-rotate-angle'] = `${classOpts.rotate}`;
    }

    return {
      transform: parsedTransform,
      classes: faClassList(classOpts),
      title: this.title(),
      styles,
    };
  }

  private updateContent(params: TextParams) {
    ensureCss(this.document, this.config);
    return this.sanitizer.bypassSecurityTrustHtml(text(this.content() || '', params).html.join('\n'));
  }
}
