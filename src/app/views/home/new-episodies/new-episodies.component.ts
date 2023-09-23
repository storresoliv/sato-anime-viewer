import { Component, OnInit } from '@angular/core'
import { INewEpisodies } from 'src/app/models/new-episodies.model'
import { ScraperRepository } from 'src/app/repositories'

interface INewEpisodeItem extends INewEpisodies {
  selected: boolean
}

@Component({
  selector: 'app-new-episodies',
  templateUrl: './new-episodies.component.html',
  styleUrls: ['./new-episodies.component.scss']
})
export class NewEpisodiesComponent implements OnInit {
  #episodeOverTarget = ''

  public newEpisodies!: INewEpisodeItem[]


  constructor(private readonly scraperRepository: ScraperRepository) {}

  ngOnInit(): void {
    this.getNewEpisodies()
  }

  onTouchStart(episode: INewEpisodeItem) {
    this.onMouseOver(episode)
  }

  onMouseOver(episode: INewEpisodeItem) {
    if (this.#episodeOverTarget === episode.id) {
      return
    }

    this.#episodeOverTarget = episode.id

    this.newEpisodies = this.newEpisodies.map(ep => {
      let selected = false

      if (ep.id === episode.id) {
        selected = true
      }

      return { ...ep, selected }
    })
  }

  private getNewEpisodies(): void {
    this.scraperRepository.fetchNewEpisodies().subscribe((episodies) => {
      this.newEpisodies = episodies.map(ep => ({ ...ep, selected: false }))
    })
  }
}
