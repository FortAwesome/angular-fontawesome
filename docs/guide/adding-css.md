# Adding CSS

For Font Awesome icon to render properly, it needs global Font Awesome styles to be added to the page. By default, the library will automatically add the necessary styles to the page before rendering an icon. 

If you have issues with this approach, you can disable it by setting `FaConfig.autoAddCss` to `false`:

```typescript
import { FaConfig } from '@fortawesome/angular-fontawesome';

export class AppComponent {
  constructor(faConfig: FaConfig) {
    faConfig.autoAddCss = false;
  }
}
```

And instead add the styles manually to your application. You can find the necessary styles in the `node_modules/@fortawesome/fontawesome-svg-core/styles.css` file. Then add them to the application global styles in the `angular.json` file:

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/@fortawesome/fontawesome-svg-core/styles.css",
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

One common case when this is necessary is when using Shadow DOM. Angular includes [certain non-trivial logic](https://angular.io/guide/view-encapsulation#mixing-encapsulation-modes) to ensure that global styles work as expected inside the shadow root which can't be applied when styles are added automatically.

## Size concerns

If you are concerned about the size of the Font Awesome global styles, you may extract only the necessary styles from the `node_modules/@fortawesome/fontawesome-svg-core/styles.css` file and add them instead. This way, you can reduce the size of the global styles to only what is necessary for your application. But be aware that this is not officially supported and may break with future updates to Font Awesome. Make sure to revisit the manually extracted styles every time the library is updated or a new Font Awesome feature is used. 
