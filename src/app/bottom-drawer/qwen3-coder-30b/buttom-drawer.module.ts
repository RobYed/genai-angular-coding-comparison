// bottom-drawer.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomDrawerComponent } from './bottom-drawer.component';

@NgModule({
  declarations: [
    BottomDrawerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BottomDrawerComponent
  ]
})
export class BottomDrawerModule { }
