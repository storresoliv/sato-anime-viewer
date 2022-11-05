import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { INewEpisodies } from '../models/new-episodies.model';
import { environment } from 'src/environments/environment';
import {
  SERIES_MOCK,
  EPISODE_LINK_MOCK,
  NEW_EPISODIES_MOCK,
} from './scraper.mock';
import { IEpisode } from '../models/episode-link.model';
import { ISerie } from '../models/serie.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ScraperRepository {
  constructor(private readonly http: HttpClient, @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer) {}

  private prevNewEpisodies$ = new ReplaySubject<INewEpisodies[]>();
  private prevEpisodeLink$$: { [key: string]: IEpisode[] } = {};
  private prevSeries$ = new ReplaySubject<ISerie[]>();

  fetchNewEpisodies(): Observable<INewEpisodies[]> {
    if (!environment.production) {
      return of(NEW_EPISODIES_MOCK);
    }

    this.getNewEpisodies().subscribe((newEpisodies) => {
      this.prevNewEpisodies$.next(newEpisodies);
    });

    return this.prevNewEpisodies$;
  }

  private getNewEpisodies(): Observable<INewEpisodies[]> {
    return this.http.get<INewEpisodies[]>(environment.newEpisodies);
  }

  fetchEpisodeLink(name: string, episode: string): Observable<IEpisode[]> {
    if (!environment.production) {
      return of(EPISODE_LINK_MOCK);
    }

    let episodeLikeKey = `${name}-${episode}`;

    if (this.prevEpisodeLink$$[episodeLikeKey]) {
      return of(this.prevEpisodeLink$$[episodeLikeKey]);
    }

    return this.getEpisodeLink(name, episode).pipe(
      tap((episodeLink) => {
        this.prevEpisodeLink$$[episodeLikeKey] = episodeLink;
      })
    );
  }

  private getEpisodeLink(
    name: string,
    episode: string
  ): Observable<IEpisode[]> {
    return this.http.get<IEpisode[]>(
      `${environment.episodeLink}/${name}/episode/${episode}`
    );
  }

  fetchSeries(): Observable<ISerie[]> {
    if (!environment.production) {
      return of(SERIES_MOCK);
    }

    this.getSeries().subscribe((series) => {
      this.prevSeries$.next(series);
    });

    return this.prevSeries$;
  }

  private getSeries(): Observable<ISerie[]> {
    return this.http
      .get<ISerie[]>(environment.series)
      .pipe(
        map((series) =>
          series.map((serie) => ({
            ...serie,
            imageUrl: this.sanitizer.bypassSecurityTrustResourceUrl(serie.imageUrl as string),
          }))
        )
      );
  }
}
