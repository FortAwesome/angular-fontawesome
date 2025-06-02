import { RotateProp } from '@fortawesome/fontawesome-svg-core';
import { FaProps } from '../models/props.model';

export const isKnownRotateValue = (rotate: RotateProp | string | undefined) =>
  rotate != null &&
  (rotate === 90 || rotate === 180 || rotate === 270 || rotate === '90' || rotate === '180' || rotate === '270');

/**
 * Fontawesome class list.
 * Returns classes array by props.
 */
export const faClassList = (props: FaProps): string[] => {
  const knownRotateValue = isKnownRotateValue(props.rotate);

  const classes = {
    [`fa-${props.animation}`]: props.animation != null && !props.animation.startsWith('spin'),
    'fa-spin': props.animation === 'spin' || props.animation === 'spin-reverse',
    'fa-spin-pulse': props.animation === 'spin-pulse' || props.animation === 'spin-pulse-reverse',
    'fa-spin-reverse': props.animation === 'spin-reverse' || props.animation === 'spin-pulse-reverse',
    // According to https://fontawesome.com/docs/web/style/animate#spin fa-pulse
    // class is deprecated, remove the below line when Font Awesome 5 support
    // is dropped.
    'fa-pulse': props.animation === 'spin-pulse' || props.animation === 'spin-pulse-reverse',
    'fa-fw': props.fixedWidth,
    'fa-border': props.border,
    'fa-inverse': props.inverse,
    'fa-layers-counter': props.counter,
    'fa-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
    'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both',
    [`fa-${props.size}`]: props.size !== null,
    [`fa-rotate-${props.rotate}`]: knownRotateValue,
    'fa-rotate-by': props.rotate != null && !knownRotateValue,
    [`fa-pull-${props.pull}`]: props.pull !== null,
    [`fa-stack-${props.stackItemSize}`]: props.stackItemSize != null,
  };

  return Object.keys(classes)
    .map((key) => (classes[key] ? key : null))
    .filter((key): key is string => key != null);
};
