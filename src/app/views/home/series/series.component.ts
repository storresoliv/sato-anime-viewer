import { Component, OnInit } from '@angular/core';
import { ISerie } from 'src/app/models/serie.model';
import { ScraperRepository } from 'src/app/repositories';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit {
  public series!: ISerie[];

  constructor(private readonly repository: ScraperRepository) {}

  ngOnInit(): void {
    // this.fetchSeries();
  }

  private fetchSeries(): void {
    this.repository.fetchSeries().subscribe((series) => {
      this.series = series;
    });
  }
}
