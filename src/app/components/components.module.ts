import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './video-list/video-list.component';

const declarations = [VideoListComponent];

@NgModule({
  declarations,
  imports: [CommonModule],
  exports: [...declarations]
})
export class ComponentsModule {}
