# Storybook

This guide explains how to use Font Awesome within storybook.

---

We can use Angular's `APP_INITIALIZER` function to execute arbitrary code when Storybook loads:

```typescript
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faTimes } from '@fortawesome/free-solid-svg-icons';

export default {
  title: 'Components/Actions/Button',
  component: MyButton,
  decorators: [
    moduleMetadata({
      imports: [FontAwesomeModule],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: (iconLibrary: FaIconLibrary) => async() => {
            // Add any icons needed here:
            iconLibrary.addIcons(faHome);
            iconLibrary.addIcons(faTimes);
          },
          // When using a factory provider you need to explicitly specify its dependencies.
          deps: [FaIconLibrary],
          multi: true,
        },
      ],
    }),
  ],
};

export const iconStory = () => ({
  template: `
      <button>
        <fa-icon [icon]="homeIcon" />
        Go Home
      </button>
      
      <button>
        <fa-icon [icon]="closeIcon" />
        Close
      </button>
  `,
  // Provide the icons as props:
  props: {
    homeIcon: faHome,
    closeIcon: faTimes,
  },
});
```

Many thanks to [yaroslav-admin][so-user] who first [posted][so-post] about this solution.

[so-post]: https://stackoverflow.com/a/58672268/722367
[so-user]: https://stackoverflow.com/users/1377864/yaroslav-admin
