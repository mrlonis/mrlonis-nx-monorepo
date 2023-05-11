import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_CONFIG_TOKEN, ApiConfigProvider } from '@mrlonis/ngx-mrlonis-shared';
import { AppRoutingModule } from './app-routing.module';

export interface AppConfig {
  apiUrl: string;
}

export interface AppWindow extends Window {
  config: AppConfig;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
export const config = (window as AppWindow & typeof globalThis).config;

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: API_CONFIG_TOKEN,
      useValue: {
        apiUrl: config.apiUrl
      } as ApiConfigProvider
    },
    importProvidersFrom(AppRoutingModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule)
  ]
};
