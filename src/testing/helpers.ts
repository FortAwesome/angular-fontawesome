import { CommonModule } from '@angular/common';
import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IconDefinition, IconName, library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FaDuotoneIconComponent } from '../lib/icon/duotone-icon.component';
import { FaIconComponent } from '../lib/icon/icon.component';
import { FaLayersCounterComponent } from '../lib/layers/layers-counter.component';
import { FaLayersTextComponent } from '../lib/layers/layers-text.component';
import { FaLayersComponent } from '../lib/layers/layers.component';
import { FaStackItemSizeDirective } from '../lib/stack/stack-item-size.directive';
import { FaStackComponent } from '../lib/stack/stack.component';

export function initTest<T>(component: Type<T>, providers?: any[]): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [CommonModule],
    declarations: [
      FaIconComponent,
      FaDuotoneIconComponent,
      FaLayersComponent,
      FaLayersTextComponent,
      FaLayersCounterComponent,
      FaStackComponent,
      FaStackItemSizeDirective,
      component,
    ],
    providers,
  });
  library.add(faUser);
  return TestBed.createComponent(component);
}

export function queryByCss(fixture: ComponentFixture<any>, cssSelector: string): HTMLElement {
  return fixture.nativeElement.querySelector(cssSelector);
}

export const faDummy: IconDefinition = {
  prefix: 'fad',
  iconName: 'dummy' as IconName,
  icon: [512, 512, [], 'f030', ['M50 50 H412 V250 H50 Z', 'M50 262 H412 V462 H50 Z']],
};
