import { Icon, IconLookup } from '@fortawesome/fontawesome-svg-core';

export const faWarnIfIconHtmlMissing = (iconObj: Icon, iconSpec: IconLookup) => {
  if (iconSpec && !iconObj) {
    console.error(
      `FontAwesome: Could not find icon with iconName=${iconSpec.iconName} and prefix=${iconSpec.prefix}. ` +
      `This warning will become a hard error in 0.6.0.`
    );
  }
};
