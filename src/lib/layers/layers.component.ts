import { Component, Input, SimpleChanges, OnChanges, OnInit, HostBinding } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faLayerClassList } from '../shared/utils/classlist.util';
import { FaProps } from '../shared/models/props.model';

/**
 * Fontawesome layers.
 */
@Component({
  selector: 'fa-layers',
  template: `<ng-content select="fa-icon, fa-layers-text, fa-layers-counter"></ng-content>`,
})
export class FaLayersComponent implements OnInit, OnChanges {
  @Input() size?: SizeProp;
  @Input() fixedWidth?: boolean;

  @HostBinding('class')
  hostClass = 'fa-layers';

  ngOnInit() {
    this.updateClasses();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.updateClasses();
    }
  }

  updateClasses() {
    const classOpts: FaProps = {
      size: this.size || null,
      fixedWidth: this.fixedWidth,
    };
    this.hostClass = `fa-layers ${faLayerClassList(classOpts).join(' ')}`;
  }

}
