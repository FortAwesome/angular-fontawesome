import { bootstrapApplication, provideClientHydration, withNoIncrementalHydration } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideClientHydration(withNoIncrementalHydration())],
}).catch((err) => console.error(err));
