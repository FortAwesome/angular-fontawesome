import { Icon, IconLookup } from '@fortawesome/fontawesome';

/**
 * Warns if icon html missing although there is icon spec.
 * @param {Icon} iconObj
 * @param {IconLookup} iconSpec
 */
export const faWarnIfIconHtmlMissing = (iconObj: Icon, iconSpec: IconLookup) => {
  if (iconSpec && !iconObj) {
    console.error(`FontAwesome: Could not find icon with iconName=${iconSpec.iconName} and prefix=${iconSpec.prefix}`);
  }
};
