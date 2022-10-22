import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { INewEpisodies } from '../models/new-episodies.model';
import { environment } from 'src/environments/environment';
import { EPISODE_LINK_MOCK, NEW_EPISODIES_MOCK } from './scraper.mock';
import { IEpisodeLink } from '../models/episode-link.model';

@Injectable({
  providedIn: 'root'
})
export class ScraperRepository {

  constructor(private readonly http: HttpClient) { }

  getNewEpisodies(): Observable<INewEpisodies[]> {
    if (!environment.production) {
      return of(NEW_EPISODIES_MOCK)
    }

    return this.http.get<INewEpisodies[]>(environment.newEpisodies)
  }

  getEpisodeLink(name: string, episode: string): Observable<IEpisodeLink>  {
    if (!environment.production) {
      return of(EPISODE_LINK_MOCK)
    }

    return this.http.get<IEpisodeLink>(`${environment.episodeLink}/${name}/episode/${episode}`)
  }
}
