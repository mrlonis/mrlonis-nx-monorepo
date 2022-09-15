import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiConfigProvider, API_CONFIG_TOKEN, AppComponent, AppRoutingModule, config as appConfig } from './app';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: API_CONFIG_TOKEN,
      useValue: {
        apiUrl: appConfig.apiUrl,
      } as ApiConfigProvider,
    },
    importProvidersFrom(AppRoutingModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
  ],
}).catch((err) => console.error(err));
