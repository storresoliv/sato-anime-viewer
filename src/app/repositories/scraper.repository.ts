import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable, of, ReplaySubject, tap } from 'rxjs'
import { ILink, INewEpisode, INewEpisodes } from '../models/new-episodes.model'
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

  getServers(): Observable<string[]> {
    const mapToEpisodes = map((newEpisode: INewEpisodes) => newEpisode.data)
    const mapToLinks = map((episodes: INewEpisode[]) => episodes.flatMap((episode) => episode.links))
    const flatMapToDomain = map((links: ILink[]) => links.flatMap((link) => link.domain))
    const flatMapToUniqueDomains = map((domains: string[]) => [...new Set(domains)])

    return this.prevNewEpisodes$
      .pipe(mapToEpisodes)
      .pipe(mapToLinks)
      .pipe(flatMapToDomain)
      .pipe(flatMapToUniqueDomains)
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
