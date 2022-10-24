import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of, ReplaySubject, tap } from 'rxjs';
import { INewEpisodies } from '../models/new-episodies.model';
import { environment } from 'src/environments/environment';
import { EPISODE_LINK_MOCK, NEW_EPISODIES_MOCK } from './scraper.mock';
import { IEpisodeLink } from '../models/episode-link.model';

@Injectable({
  providedIn: 'root'
})
export class ScraperRepository {

  constructor(private readonly http: HttpClient) { }

  private prevNewEpisodies$ = new ReplaySubject<INewEpisodies[]>()
  private prevEpisodeLink$$: { [key: string]: IEpisodeLink } = {}

  fetchNewEpisodies(): Observable<INewEpisodies[]> {
    if (!environment.production) {
      return of(NEW_EPISODIES_MOCK)
    }

    this.getNewEpisodies().subscribe((newEpisodies => {
      this.prevNewEpisodies$.next(newEpisodies)
    }))

    return this.prevNewEpisodies$
  }

  private getNewEpisodies(): Observable<INewEpisodies[]> {
    return this.http.get<INewEpisodies[]>(environment.newEpisodies)
  }

  fetchEpisodeLink(name: string, episode: string): Observable<IEpisodeLink> {
    if (!environment.production) {
      return of(EPISODE_LINK_MOCK)
    }

    let episodeLikeKey = `${name}-${episode}`

    if (this.prevEpisodeLink$$[episodeLikeKey]) {
      return of(this.prevEpisodeLink$$[episodeLikeKey])
    }

    return this.getEpisodeLink(name, episode).pipe(tap(episodeLink => {
      this.prevEpisodeLink$$[episodeLikeKey] = episodeLink
    }))
  }

  private getEpisodeLink(name: string, episode: string): Observable<IEpisodeLink> {
    return this.http.get<IEpisodeLink>(`${environment.episodeLink}/${name}/episode/${episode}`)
  }
}
