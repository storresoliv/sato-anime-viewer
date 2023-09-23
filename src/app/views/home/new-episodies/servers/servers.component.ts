import { Component, Input, OnInit } from '@angular/core'
import { ILink } from 'src/app/models/new-episodies.model'

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
  @Input() link!: ILink

  constructor() {}

  ngOnInit(): void {}
}
