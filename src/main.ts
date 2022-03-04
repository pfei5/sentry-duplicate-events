import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Sentry from '@sentry/angular';
import { BrowserOptions, EventHint, Event } from '@sentry/angular';
import { HttpErrorResponse } from '@angular/common/http';

const init: BrowserOptions = {
  dsn: 'add-your-dsn-here',
  environment: 'test',
  debug: true,
  enabled: true,
  integrations: [
    new Sentry.Integrations.Breadcrumbs({ console: false, fetch: false }),
  ],
  autoSessionTracking: false,
  tracesSampleRate: 0,
  sampleRate: 1.0,
  beforeSend: (
    event: Event,
    hint?: EventHint
  ): PromiseLike<Event | null> | Event | null => {
    // Avoid duplicate error reporting
    // https://github.com/getsentry/sentry-javascript/issues/2532#issuecomment-875428325
    // if (hint?.originalException instanceof HttpErrorResponse) {
    //   return null;
    // }
    return event;
  },
};
Sentry.init(init);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
