import { Component, OnInit } from '@angular/core'
import { INewEpisode, INewEpisodes } from 'src/app/models/new-episodes.model'
import { ScraperRepository } from 'src/app/repositories'
import { ServerService } from 'src/app/shared/services/server.service'

interface INewEpisodeItem extends INewEpisode {
  selected: boolean
}

@Component({
  selector: 'app-new-episodes',
  templateUrl: './new-episodies.component.html',
  styleUrls: ['./new-episodies.component.scss']
})
export class NewEpisodesComponent implements OnInit {
  #episodeOverTargetItem!: INewEpisodeItem
  #serverSelected = ''

  public newEpisodes!: INewEpisodeItem[]
  public latestEpisode!: INewEpisodeItem

  constructor(
    private readonly scraperRepository: ScraperRepository,
    private readonly serverService: ServerService
  ) {}

  ngOnInit(): void {
    this.getNewEpisodes()
    this.getServerSelected()
  }

  onTouchStart(episode: INewEpisodeItem) {
    const { url } = episode.links.find(
      (link) => link.domain === this.#serverSelected
    ) || { url: '' }

    if (url === '' || !url) {
      return
    }

    window.open(url, '_blank')?.focus()
  }

  onMouseOver(episode: INewEpisodeItem) {
    if (this.#episodeOverTargetItem?.id === episode.id) {
      return
    }

    if (this.#episodeOverTargetItem) {
      this.#episodeOverTargetItem.selected = false
    }

    this.#episodeOverTargetItem = episode

    this.#episodeOverTargetItem.selected = true
  }

  private getNewEpisodes(): void {
    this.scraperRepository
      .fetchNewEpisodes()
      .subscribe((newEpisodes: INewEpisodes) => {
        const episodes = newEpisodes.data.map((ep) => ({
          ...ep,
          selected: false
        }))

        const [latestEpisode, ...rest] = episodes

        this.newEpisodes = rest

        this.latestEpisode = latestEpisode
      })
  }

  private getServerSelected() {
    this.serverService.getServer().subscribe((server) => {
      this.#serverSelected = server
    })
  }
}
