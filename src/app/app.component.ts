import { Component, OnInit } from '@angular/core'
import { ScraperRepository } from './repositories'
import { ServerService } from './shared/services/server.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  servers = ['']

  constructor(
    private readonly scraperRepository: ScraperRepository,
    private readonly serverService: ServerService
  ) {}

  ngOnInit(): void {
    this.scraperRepository.getServers().subscribe((servers) => {
      const [defaultServerSelected] = servers
      
      this.servers = servers

      this.setServer(defaultServerSelected)
    })
  }

  setServer(server: string) {
    this.serverService.setServer(server)
  }
}
