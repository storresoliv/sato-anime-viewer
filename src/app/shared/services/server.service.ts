import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  #serverSelected = new Subject<string>()

  constructor() {}

  setServer(server: string) {
    this.#serverSelected.next(server)
  }

  getServer() {
    return this.#serverSelected
  }
}
