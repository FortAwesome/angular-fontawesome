import { Component, inject, input, computed, ChangeDetectionStrategy, DOCUMENT } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { counter, CounterParams } from '@fortawesome/fontawesome-svg-core';
import { FaConfig } from '../config';
import { faWarnIfParentNotExist } from '../shared/errors/warn-if-parent-not-exist';
import { ensureCss } from '../shared/utils/css';
import { FaLayersComponent } from './layers.component';

@Component({
  selector: 'fa-layers-counter',
  template: '',
  host: {
    class: 'ng-fa-layers-counter',
    '[innerHTML]': 'renderedHTML()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaLayersCounterComponent {
  readonly content = input.required<string>();
  readonly title = input<string>();
  readonly position = input<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>();

  readonly renderedHTML = computed(() => {
    const params = this.buildParams();
    return this.updateContent(params);
  });

  private document = inject(DOCUMENT);
  private config = inject(FaConfig);
  private parent = inject(FaLayersComponent, { optional: true });
  private sanitizer = inject(DomSanitizer);

  constructor() {
    faWarnIfParentNotExist(this.parent, 'FaLayersComponent', this.constructor.name);
  }

  protected buildParams(): CounterParams {
    const position = this.position();
    return {
      title: this.title(),
      classes: position != null ? [`fa-layers-${position}`] : undefined,
    };
  }

  private updateContent(params: CounterParams) {
    ensureCss(this.document, this.config);
    return this.sanitizer.bypassSecurityTrustHtml(counter(this.content() || '', params).html.join(''));
  }
}
