import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiConfigProvider, API_CONFIG_TOKEN } from '@mrlonis/ngx-mrlonis-shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { config as appConfig, CoreModule } from './core';
import { CharactersModule } from './features';

@NgModule({
  declarations: [AppComponent],
  imports: [CharactersModule, CoreModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule],
  providers: [
    {
      provide: API_CONFIG_TOKEN,
      useValue: {
        apiUrl: appConfig.apiUrl
      } as ApiConfigProvider
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
