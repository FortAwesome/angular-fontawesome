import { Component, ElementRef, inject, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'fa-stack',
  template: `<ng-content></ng-content>`,
})
export class FaStackComponent implements OnInit, OnChanges {
  /**
   * Size of the stacked icon.
   * Note that stacked icon is by default 2 times bigger, than non-stacked icon.
   * You'll need to set size using custom CSS to align stacked icon with a
   * simple one. E.g. `fa-stack { font-size: 0.5em; }`.
   */
  @Input() size?: SizeProp;

  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef);

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'fa-stack');
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
