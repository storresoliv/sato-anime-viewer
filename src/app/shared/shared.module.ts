import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { W3RemovePipe } from './pipes/w3-remove.pipe'

import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatBadgeModule } from '@angular/material/badge'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { ServerService } from './services/server.service'

const material = [
  MatCardModule,
  MatButtonModule,
  MatBadgeModule,
  MatProgressBarModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule
]

const services = [ServerService]

@NgModule({
  declarations: [W3RemovePipe],
  providers: [...services],
  imports: [CommonModule, ...material],
  exports: [W3RemovePipe, ...material]
})
export class SharedModule {}
