import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { INewEpisodies } from '../models/new-episodies.model';
import { environment } from 'src/environments/environment';
import { NEW_EPISODIES } from './scraper.mock';

@Injectable({
  providedIn: 'root'
})
export class ScraperRepository {

  constructor(private readonly http: HttpClient) { }

  getNewEpisodies(): Observable<INewEpisodies[]> {
    // return this.http.get<INewEpisodies[]>(environment.newEpisodies)
    return of(NEW_EPISODIES)
  }
}
