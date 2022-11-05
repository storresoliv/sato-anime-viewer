import { Component, OnInit } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IEpisode } from 'src/app/models/episode-link.model';
import { ScraperRepository } from 'src/app/repositories';

type VideoLink = { title: string; link: SafeResourceUrl; active: boolean };

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  public videoLinks!: VideoLink[];
  public playerLink!: SafeResourceUrl;
  public title!: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly scraperRepository: ScraperRepository,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getQueryParams();
  }

  selectVideoPlayer(videoPlayer: VideoLink): void {
    this.setVideoLinksSelected(videoPlayer);
  }

  private setVideoLinksSelected({ title, link }: VideoLink): void {
    let videoLinksInactive = this.setVideoLinksInactive();
    let videoLinksSelected = videoLinksInactive.map((video) => ({
      ...video,
      active: video.title === title,
    }));

    this.setVideoLinks(videoLinksSelected);
    this.setPlayerLink(link);
  }

  private setVideoLinksInactive(): VideoLink[] {
    return [...this.videoLinks.map((video) => ({ ...video, active: false }))];
  }

  private getQueryParams(): void {
    this.route.queryParams.subscribe(({ name, episode }) => {
      if (name && episode) {
        this.title = name;
        this.getEpisodeLink(name, episode);
      }
    });
  }

  private getEpisodeLink(name: string, episode: string): void {
    this.scraperRepository
      .fetchEpisodeLink(name, episode)
      .subscribe((videoLinksResponse) => {
        let videoLinks = this.transformVideoLinks(videoLinksResponse);
        let videoLinksDefault = this.setDefaultVideo(videoLinks);
        let [{ link }] = videoLinksDefault;

        this.setPlayerLink(link);
        this.setVideoLinks(videoLinksDefault);
      });
  }

  private setVideoLinks(videoLinks: VideoLink[]): void {
    this.videoLinks = videoLinks;
  }

  private transformVideoLinks(episodes: IEpisode[]): VideoLink[] {
    return episodes.map(
      ({ title, link }) =>
        ({
          title,
          link: this.sanitizer.bypassSecurityTrustResourceUrl(link),
          active: false,
        } as VideoLink)
    );
  }

  private setDefaultVideo([first, ...rest]: VideoLink[]): VideoLink[] {
    return [{ ...first, active: true }, ...rest];
  }

  private setPlayerLink(link: SafeResourceUrl): void {
    this.playerLink = link;
  }
}
