import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { ScraperRepository } from './scraper.repository';



@NgModule({
  providers: [ScraperRepository],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class RepositoriesModule { }
