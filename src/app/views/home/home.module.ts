import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { NewEpisodiesComponent } from './new-episodies/new-episodies.component';
import { SeriesComponent } from './series/series.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    HomeComponent,
    NewEpisodiesComponent,
    SeriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule
  ]
})
export class HomeModule { }
