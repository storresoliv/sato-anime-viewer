import { Component, OnInit } from '@angular/core';
import { INewEpisodies } from 'src/app/models/new-episodies.model';
import { ScraperRepository } from 'src/app/repositories';

@Component({
  selector: 'app-new-episodies',
  templateUrl: './new-episodies.component.html',
  styleUrls: ['./new-episodies.component.scss']
})
export class NewEpisodiesComponent implements OnInit {
  public newEpisodies!: INewEpisodies[]

  constructor(private readonly scraperRepository: ScraperRepository) { }

  ngOnInit(): void {
    this.getNewEpisodies()
  }

  private getNewEpisodies(): void {
    this.scraperRepository.getNewEpisodies().subscribe(episodies => {
      this.newEpisodies = episodies
    })
  }

}
