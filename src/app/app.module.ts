import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RepositoriesModule } from './repositories/repositories.module';
import { FavoriteModule, HomeModule, SettingsModule } from './views';
import { PlayerModule } from './views/player/player.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RepositoriesModule,
    HomeModule,
    FavoriteModule,
    SettingsModule,
    PlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
