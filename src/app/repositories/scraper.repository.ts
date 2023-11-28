import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of, ReplaySubject, tap } from 'rxjs'
import { INewEpisodes } from '../models/new-episodes.model'
import { environment } from 'src/environments/environment'
import { NEW_EPISODES_MOCK } from './scraper.mock'
import { IEpisodeLink } from '../models/episode-link.model'

@Injectable({
  providedIn: 'root'
})
export class ScraperRepository {
  constructor(private readonly http: HttpClient) {}

  private prevNewEpisodes$ = new ReplaySubject<INewEpisodes>()
  private prevEpisodeLink$$: { [key: string]: IEpisodeLink } = {}

  fetchNewEpisodes(): Observable<INewEpisodes> {
    if (!environment.production) {
      return of(NEW_EPISODES_MOCK)
    }

    this.getNewEpisodes().subscribe((newEpisodes) => {
      this.prevNewEpisodes$.next(newEpisodes)
    })

    return this.prevNewEpisodes$
  }

  private getNewEpisodes(): Observable<INewEpisodes> {
    const url = `${environment.newEpisodes}?sort=desc&per_page=100`

    return this.http.get<INewEpisodes>(url)
  }

  fetchEpisodeLink(name: string, episode: string): Observable<IEpisodeLink> {
    if (!environment.production) {
      return of({ links: [] })
    }

    let episodeLikeKey = `${name}-${episode}`

    if (this.prevEpisodeLink$$[episodeLikeKey]) {
      return of(this.prevEpisodeLink$$[episodeLikeKey])
    }

    return this.getEpisodeLink(name, episode).pipe(
      tap((episodeLink) => {
        this.prevEpisodeLink$$[episodeLikeKey] = episodeLink
      })
    )
  }

  private getEpisodeLink(
    name: string,
    episode: string
  ): Observable<IEpisodeLink> {
    return this.http.get<IEpisodeLink>(
      `${environment.episodeLink}/${name}/episode/${episode}`
    )
  }
}
