import { Component, OnInit } from '@angular/core';
import { VideoItem } from 'src/app/components/video-list/video-list.component';
import { ScraperRepository } from 'src/app/repositories';

type VideoSerie = VideoItem & { name: string };

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit {
  public series!: VideoSerie[];

  constructor(private readonly repository: ScraperRepository) {}

  ngOnInit(): void {
    this.fetchSeries();
  }

  goToSerieDetails(video: VideoSerie): void {
    console.log(video);
  }

  private fetchSeries(): void {
    this.repository.fetchSeries().subscribe((series) => {
      this.series = series.map(({ title, imageUrl, name }) => ({
        title,
        imageUrl,
        name,
      }));
    });
  }
}
