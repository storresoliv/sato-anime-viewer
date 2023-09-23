import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3RemovePipe } from './pipes/w3-remove.pipe'


@NgModule({
  declarations: [W3RemovePipe],
  imports: [
    CommonModule
  ],
  exports: [W3RemovePipe]
})
export class SharedModule { }
