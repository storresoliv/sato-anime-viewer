import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEpisodiesComponent } from './components/new-episodies/new-episodies.component';



@NgModule({
  declarations: [
    NewEpisodiesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [NewEpisodiesComponent]
})
export class NewEpisodiesModule { }
