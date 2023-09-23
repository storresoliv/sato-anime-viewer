import { Component, OnInit } from '@angular/core'
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl
} from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { IEpisodeLink } from 'src/app/models/episode-link.model'
import { ScraperRepository } from 'src/app/repositories'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public playerLink!: SafeResourceUrl

  constructor(
    private readonly route: ActivatedRoute,
    private readonly scraperRepository: ScraperRepository,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getQueryParams()
  }

  private getQueryParams(): void {
    this.route.queryParams.subscribe(({ name, episode }) => {
      if (name && episode) {
        this.getEpisodeLink(name, episode)
      }
    })
  }

  private getEpisodeLink(name: string, episode: string): void {
    this.scraperRepository
      .fetchEpisodeLink(name, episode)
      .subscribe(({ links }) => {
        this.playerLink = this.sanitizer.bypassSecurityTrustResourceUrl(
          links[1]
        )
      })
  }
}
