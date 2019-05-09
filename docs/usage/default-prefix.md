# Changing the default prefix

The default prefix, `fas`, can be adjusted by injecting the `FaIconService` and modifying the `defaultPrefix` property.

```typescript
import { FaIconService } from '@fortawesome/angular-fontawesome';

export class AppComponent {

  constructor(private faIconService: FaIconService) {
      this.faIconService.defaultPrefix = 'far';
  }

}
```