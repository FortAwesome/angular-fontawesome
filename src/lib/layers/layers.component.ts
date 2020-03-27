import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FaConfig } from '../config';
/**
 * Fontawesome layers.
 */
@Component({
  selector: 'fa-layers',
  template: `<ng-content select="fa-icon, fa-duotone-icon, fa-layers-text, fa-layers-counter"></ng-content>`,
})
export class FaLayersComponent implements OnInit, OnChanges {
  @Input() size?: SizeProp;

  @Input() @HostBinding('class.fa-fw') fixedWidth?: boolean;

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private config: FaConfig) {}

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'fa-layers');
    this.fixedWidth = typeof this.fixedWidth === 'boolean' ? this.fixedWidth : this.config.fixedWidth;
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
