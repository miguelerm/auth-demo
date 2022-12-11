import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { facebookInitializer } from './facebook-initializer';

import { AppComponent } from './app.component';
import { configInitializer, ConfigService } from './config.service';
import { googleInitializer } from './google-initializer';
import { AuthService } from './auth.service';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxJsonViewerModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: configInitializer, multi: true, deps: [ConfigService] },
    { provide: APP_INITIALIZER, useFactory: facebookInitializer, multi: true, deps: [ConfigService, AuthService] },
    { provide: APP_INITIALIZER, useFactory: googleInitializer, multi: true, deps: [ConfigService, AuthService] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
