import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomeComponent } from './home.component'
import { RouterModule } from '@angular/router'
import { NewEpisodesComponent } from './new-episodies/new-episodies.component';
import { ServersComponent } from './new-episodies/servers/servers.component'
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomeComponent, NewEpisodesComponent, ServersComponent],
  imports: [CommonModule, RouterModule, SharedModule]
})
export class HomeModule {}
