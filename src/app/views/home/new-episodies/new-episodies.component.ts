import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoItem } from 'src/app/components/video-list/video-list.component';
import { ScraperRepository } from 'src/app/repositories';

type VideoEpisode = VideoItem & { episode: string, name: string };

@Component({
  selector: 'app-new-episodies',
  templateUrl: './new-episodies.component.html',
  styleUrls: ['./new-episodies.component.scss'],
})
export class NewEpisodiesComponent implements OnInit {
  public newEpisodies!: VideoEpisode[];

  constructor(
    private readonly scraperRepository: ScraperRepository,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getNewEpisodies();
  }

  goToPlayer(video: VideoEpisode): void {
    this.router.navigate(['/player'], {
      queryParams: { name: video.name, episode: video.episode },
    });
  }

  private getNewEpisodies(): void {
    this.scraperRepository.fetchNewEpisodies().subscribe((episodies) => {
      this.newEpisodies = episodies.map(({ title, name, imageUrl, episode }) => ({
        title,
        name,
        imageUrl,
        subtitle: `episode ${episode}`,
        episode,
      }));
    });
  }
}
