import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEpisodiesModule } from './new-episodies/new-episodies.module';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NewEpisodiesModule
  ]
})
export class HomeModule { }
