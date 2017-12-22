declare module '@fortawesome/fontawesome' {
  export type Icon = {
    prefix: 'fa' | 'fas' | 'fab' | 'far' | 'fal';
    iconName: string;
    icon: any[];
  };

  export interface API {
    noAuto: any;
    dom: any;
    library: any;
    parse: any;
    findIconDefinition: any;
    icon: any;
    text: any;
    layer: any;
    config: any;
  }

  declare const fontawesome: API;
  export default fontawesome;
}
