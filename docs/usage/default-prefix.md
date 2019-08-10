# Changing the default prefix

The default prefix, `fas`, can be adjusted by injecting the `FaConfig` and modifying the `defaultPrefix` property.

```typescript
import { FaConfig } from '@fortawesome/angular-fontawesome';

export class AppComponent {
  constructor(private faConfig: FaConfig) {
    this.faConfig.defaultPrefix = 'far';
  }
}
```
