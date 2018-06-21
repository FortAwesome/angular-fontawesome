import { FaProps } from '../models/props.model';

/**
 * Fontawesome class list.
 * Returns classes array by props.
 */
export const faClassList = (props: FaProps): string[] => {
  const classes = {
    'fa-spin': props.spin,
    'fa-pulse': props.pulse,
    'fa-fw': props.fixedWidth,
    'fa-border': props.border,
    'fa-li': props.listItem,
    'fa-inverse': props.inverse,
    'fa-layers-counter': props.counter,
    'fa-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
    'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both',
    [`fa-${props.size}`]: props.size !== null,
    [`fa-rotate-${props.rotate}`]: props.rotate !== null,
    [`fa-pull-${props.pull}`]: props.pull !== null
  };

  return Object.keys(classes)
    .map(key => (classes[key] ? key : null))
    .filter(key => key);
};
