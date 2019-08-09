export const faWarnIfIconSpecMissing = () => {
  console.error('FontAwesome: Property `icon` is required for `fa-icon`/`fa-duotone-icon` components. ' +
    `This warning will become a hard error in 0.6.0.`);
};
