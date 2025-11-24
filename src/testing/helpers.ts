import { ComponentFixture } from '@angular/core/testing';
import { IconDefinition } from '../lib/types';

export const queryByCss = (fixture: ComponentFixture<any>, cssSelector: string): HTMLElement =>
  fixture.nativeElement.querySelector(cssSelector);

export const faDummy: IconDefinition = {
  prefix: 'fad',
  iconName: 'dummy',
  icon: [512, 512, [], '', ['M50 50 H412 V250 H50 Z', 'M50 262 H412 V462 H50 Z']],
};
