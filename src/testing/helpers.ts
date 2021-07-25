import { CommonModule } from '@angular/common';
import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaDuotoneIconComponent } from '../lib/icon/duotone-icon.component';
import { FaIconComponent } from '../lib/icon/icon.component';
import { FaLayersCounterComponent } from '../lib/layers/layers-counter.component';
import { FaLayersTextComponent } from '../lib/layers/layers-text.component';
import { FaLayersComponent } from '../lib/layers/layers.component';
import { FaStackItemSizeDirective } from '../lib/stack/stack-item-size.directive';
import { FaStackComponent } from '../lib/stack/stack.component';
import { IconDefinition } from '../lib/types';

export const initTest = <T>(component: Type<T>, providers?: any[]): ComponentFixture<T> => {
  TestBed.configureTestingModule({
    imports: [
      CommonModule,
      FaIconComponent,
      FaDuotoneIconComponent,
      FaLayersComponent,
      FaLayersTextComponent,
      FaLayersCounterComponent,
      FaStackComponent,
      FaStackItemSizeDirective,
    ],
    declarations: [component],
    providers,
  });
  return TestBed.createComponent(component);
};

export const queryByCss = (fixture: ComponentFixture<any>, cssSelector: string): HTMLElement =>
  fixture.nativeElement.querySelector(cssSelector);

export const faDummy: IconDefinition = {
  prefix: 'fad',
  iconName: 'dummy',
  icon: [512, 512, [], 'f030', ['M50 50 H412 V250 H50 Z', 'M50 262 H412 V462 H50 Z']],
};
