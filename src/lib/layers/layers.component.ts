import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  input,
  computed,
} from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FaConfig } from '../config';
import { ensureCss } from '../shared/utils/css';

/**
 * Fontawesome layers.
 */
@Component({
  selector: 'fa-layers',
  template: `<ng-content></ng-content>`,
  host: {
    '[class.fa-fw]': 'faFw()',
  },
})
export class FaLayersComponent implements OnInit, OnChanges {
  readonly size = input<SizeProp>();
  readonly fixedWidth = input<boolean>();
  readonly faFw = computed(() => {
    const fixedWidth = this.fixedWidth();
    return typeof fixedWidth === 'boolean' ? fixedWidth : this.config.fixedWidth;
  });
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef);
  private readonly config = inject(FaConfig);

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'fa-layers');
    ensureCss(this.document, this.config);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('size' in changes) {
      if (changes.size.currentValue != null) {
        this.renderer.addClass(this.elementRef.nativeElement, `fa-${changes.size.currentValue}`);
      }
      if (changes.size.previousValue != null) {
        this.renderer.removeClass(this.elementRef.nativeElement, `fa-${changes.size.previousValue}`);
      }
    }
  }
}
