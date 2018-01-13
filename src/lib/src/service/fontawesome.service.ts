import { Injectable } from '@angular/core';
import { layer,
  noAuto,
  icon,
  config,
  library,
  parse,
  dom,
  text,
  findIconDefinition } from '@fortawesome/fontawesome';

@Injectable()
export class FontawesomeService {
  noAuto = noAuto;
  dom = dom;
  library = library;
  parse = parse;
  findIconDefinition = findIconDefinition;
  text = text;
  layer = layer;
  config = config;
  icon = icon;
}
