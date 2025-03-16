import { DOCUMENT } from '@angular/common';
import { Component, inject, OnInit, input, computed } from '@angular/core';
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
    '[class]': 'classes()',
  },
})
export class FaLayersComponent implements OnInit {
  readonly size = input<SizeProp>();
  readonly fixedWidth = input<boolean>();
  readonly faFw = computed(() => {
    const fixedWidth = this.fixedWidth();
    return typeof fixedWidth === 'boolean' ? fixedWidth : this.config.fixedWidth;
  });
  readonly classes = computed(() => {
    const sizeValue = this.size();
    const sizeClass = sizeValue ? { [`fa-${sizeValue}`]: true } : {};
    return {
      ...sizeClass,
      'fa-fw': this.faFw(),
      'fa-layers': true,
    };
  });

  private readonly document = inject(DOCUMENT);
  private readonly config = inject(FaConfig);

  ngOnInit() {
    ensureCss(this.document, this.config);
  }
}
