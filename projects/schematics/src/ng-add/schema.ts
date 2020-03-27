export interface Schema {
  /** Name of the project. */
  project?: string;

  /** The icon packages to install */
  iconPackages?: (
    | 'free-solid'
    | 'free-regular'
    | 'free-brands'
    | 'pro-solid'
    | 'pro-regular'
    | 'pro-light'
    | 'pro-duotone'
  )[];
}
