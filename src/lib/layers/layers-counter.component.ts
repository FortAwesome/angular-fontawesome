import { Component, HostBinding, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { counter, CounterParams, Styles } from '@fortawesome/fontawesome-svg-core';
import { faWarnIfParentNotExist } from '../shared/errors/warn-if-parent-not-exist';
import { FaLayersComponent } from './layers.component';

@Component({
  selector: 'fa-layers-counter',
  template: '',
  host: {
    class: 'ng-fa-layers-counter',
  },
})
export class FaLayersCounterComponent implements OnChanges {
  @Input() content: string;
  @Input() title?: string;

  /**
   * Set `style` attribute on the SVG element rendered by the component.
   *
   * @deprecated This input breaks view encapsulation and is not recommended.
   * For simple cases (like colors), use `style` on the component itself, for
   * more complex usages, explicitly opt-in to break the view encapsulation.
   * This input is deprecated since 0.12.0 and will be removed in 0.13.0.
   */
  @Input() styles?: Styles;

  /**
   * Set `class` attribute on the SVG element rendered by the component.
   *
   * @deprecated This input breaks view encapsulation and is not recommended.
   * For simple cases (like colors), use `class` on the component itself, for
   * more complex usages, explicitly opt-in to break the view encapsulation.
   * This input is deprecated since 0.12.0 and will be removed in 0.13.0.
   */
  @Input() classes?: string[] = [];
  @Input() position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

  @HostBinding('innerHTML') renderedHTML: SafeHtml;

  constructor(
    @Optional() private parent: FaLayersComponent,
    private sanitizer: DomSanitizer,
  ) {
    faWarnIfParentNotExist(this.parent, 'FaLayersComponent', this.constructor.name);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      const params = this.buildParams();
      this.updateContent(params);
    }
  }

  protected buildParams(): CounterParams {
    const classes = [];
    if (this.classes != null) {
      classes.push(...this.classes);
    }
    if (this.position != null) {
      classes.push(`fa-layers-${this.position}`);
    }
    return {
      title: this.title,
      classes,
      styles: this.styles,
    };
  }

  private updateContent(params: CounterParams) {
    this.renderedHTML = this.sanitizer.bypassSecurityTrustHtml(counter(this.content || '', params).html.join(''));
  }
}
