export interface Schema {
  /** Name of the project. */
  project?: string;

  /** The FontAwesome version to install. */
  version?: '5' | '6' | '7' ;

  /** The icon packages to install */
  iconPackages?: (
    | 'free-solid'
    | 'free-regular'
    | 'free-brands'
    | 'pro-solid'
    | 'pro-regular'
    | 'pro-light'
    | 'pro-thin'
    | 'pro-duotone'
    | 'duotone-regular'
    | 'duotone-light'
    | 'duotone-thin'
    | 'sharp-solid'
    | 'sharp-regular'
    | 'sharp-light'
    | 'sharp-thin'
    | 'sharp-duotone-solid'
    | 'sharp-duotone-regular'
    | 'sharp-duotone-light'
    | 'sharp-duotone-thin'
  )[];
}
