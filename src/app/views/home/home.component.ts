import { Component, OnInit } from '@angular/core'
import { ServerService } from 'src/app/shared/services/server.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public serverSelected = ''
  constructor(private readonly serverService: ServerService) {}

  ngOnInit(): void {
    this.serverService.getServer().subscribe((serverSelected) => {
      this.serverSelected = serverSelected
    })
  }
}
