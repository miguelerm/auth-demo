import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { facebookInitializer } from './facebook-initializer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { configInitializer, ConfigService } from './config.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: configInitializer, multi: true, deps: [ConfigService] },
    { provide: APP_INITIALIZER, useFactory: facebookInitializer, multi: true, deps: [ConfigService] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
