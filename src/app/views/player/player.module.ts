import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PlayerComponent } from './player.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [PlayerComponent],
  imports: [CommonModule, RouterModule]
})
export class PlayerModule {}
