import { Component, OnInit } from '@angular/core'
import { INewEpisode, INewEpisodes } from 'src/app/models/new-episodes.model'
import { ScraperRepository } from 'src/app/repositories'

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

  public newEpisodes!: INewEpisodeItem[]


  constructor(private readonly scraperRepository: ScraperRepository) {}

  ngOnInit(): void {
    this.getNewEpisodes()
  }

  onTouchStart(episode: INewEpisodeItem) {
    this.onMouseOver(episode)
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
    this.scraperRepository.fetchNewEpisodes().subscribe((newEpisodes: INewEpisodes) => {
      this.newEpisodes = newEpisodes.data.map(ep => ({ ...ep, selected: false }))
    })
  }
}
