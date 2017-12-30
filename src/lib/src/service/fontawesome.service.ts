import { Injectable } from '@angular/core';
import api, {API} from '@fortawesome/fontawesome';

@Injectable()
export class FontawesomeService implements API {
  dom = api.dom;
  library = api.library;
  parse = api.parse;
  findIconDefinition = api.findIconDefinition;
  text = api.text;
  layer = api.layer;
  config = api.config;
  icon = api.icon;
}
