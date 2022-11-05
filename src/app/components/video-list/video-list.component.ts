import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

export type VideoItem = {
  title: string;
  imageUrl: SafeResourceUrl;
  subtitle?: string;
};

type Direction = 'row' | 'column';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit {
  @Output() clickEvent = new EventEmitter();
  @Input() videoList!: VideoItem[];
  @Input() title!: string;
  @Input() direction: Direction = 'row';

  constructor() {}

  ngOnInit(): void {}
}
