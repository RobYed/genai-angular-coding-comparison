import { Component } from '@angular/core';
import { BottomDrawerModule } from './buttom-drawer.module';

@Component({
  selector: 'app-qwen3-coder-example',
  standalone: true,
  imports: [BottomDrawerModule],
  template: 
   `<app-bottom-drawer>
  <ng-container preview-content>
    <h1 class="text-lg font-semibold">Great heading</h1>
    <p class="text-gray-600">This is important information which always needs to be present</p>
  </ng-container>

  <p class="mb-4">
    This is not as important and only visible if the user decides to expand
    the bottom drawer
  </p>
  <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
    Some CTA
  </button>
</app-bottom-drawer>
`
})
export class Qwen3CoderExampleComponent {}