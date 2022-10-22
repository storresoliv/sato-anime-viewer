import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './app.routes';

import { HomeComponent } from './views/home/home.component';
import { FavoriteComponent } from './views/favorite/favorite.component';
import { SettingsComponent } from './views/settings/settings.component';
import { PlayerComponent } from './views/player/player.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: APP_ROUTES.HOME,
    pathMatch: 'full'
  },
  {
    path: APP_ROUTES.HOME,
    component: HomeComponent
  },
  {
    path: APP_ROUTES.FAVORITE,
    component: FavoriteComponent
  },
  {
    path: APP_ROUTES.SETTINGS,
    component: SettingsComponent
  },
  {
    path: APP_ROUTES.PLAYER,
    component: PlayerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
