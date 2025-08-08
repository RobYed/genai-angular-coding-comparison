import { Component } from '@angular/core';
import { BottomDrawerComponent } from './bottom-drawer.component';

@Component({
  selector: 'app-qwen3-example',
  standalone: true,
  imports: [BottomDrawerComponent],
  template: 
    `<app-bottom-drawer>
    <ng-container preview-pontent>
      <h1 class="text-xl font-semibold">Important Preview</h1>
      <p>This is the always-visible content.</p>
    </ng-container>
  
    <p>This content is only visible when expanded.</p>
    <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">CTA Button</button>
  </app-bottom-drawer>`
})
export class Qwen3ExampleComponent {}