import { faClassList } from './classlist.util';
import { FaProps } from '../models/props.model';

describe('faClassList', () => {
  it('should not include undefined in class names when properties are undefined', () => {
    const props: FaProps = {
      flip: undefined,
      animation: undefined,
      border: undefined,
      inverse: undefined,
      size: undefined,
      pull: undefined,
      rotate: undefined,
      fixedWidth: false,
      stackItemSize: undefined,
    };

    const classList = faClassList(props);

    // Check that no class contains the string "undefined"
    const classesWithUndefined = classList.filter((className) => className.includes('undefined'));
    expect(classesWithUndefined.length).toBe(0);
  });

  it('should not include undefined in class names when pull is undefined', () => {
    const props: FaProps = {
      flip: undefined,
      animation: undefined,
      border: undefined,
      inverse: undefined,
      size: undefined,
      pull: undefined,
      rotate: undefined,
      fixedWidth: false,
      stackItemSize: undefined,
    };

    const classList = faClassList(props);

    expect(classList).not.toContain('fa-pull-undefined');
  });

  it('should not include undefined in class names when size is undefined', () => {
    const props: FaProps = {
      flip: undefined,
      animation: undefined,
      border: undefined,
      inverse: undefined,
      size: undefined,
      pull: undefined,
      rotate: undefined,
      fixedWidth: false,
      stackItemSize: undefined,
    };

    const classList = faClassList(props);

    expect(classList).not.toContain('fa-undefined');
  });

  it('should include correct class names when properties are set', () => {
    const props: FaProps = {
      flip: 'horizontal',
      animation: 'bounce',
      border: true,
      inverse: false,
      size: 'lg',
      pull: 'left',
      rotate: 90,
      fixedWidth: true,
      stackItemSize: undefined,
    };

    const classList = faClassList(props);

    expect(classList).toContain('fa-bounce');
    expect(classList).toContain('fa-fw');
    expect(classList).toContain('fa-border');
    expect(classList).toContain('fa-flip-horizontal');
    expect(classList).toContain('fa-lg');
    expect(classList).toContain('fa-rotate-90');
    expect(classList).toContain('fa-pull-left');
  });
});
