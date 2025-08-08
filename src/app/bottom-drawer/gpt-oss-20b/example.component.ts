import { Component } from '@angular/core';
import { BottomDrawerModule } from './buttom-drawer.module';

@Component({
  selector: 'app-gpt-oss-example',
  standalone: true,
  imports: [BottomDrawerModule],
  template: 
   `<app-bottom-drawer>
  <ng-container preview-pontent>
    <h1 class="text-xl font-semibold">Great heading</h1>
    <p class="text-gray-700">
      This is important information which always needs to be present
    </p>
  </ng-container>

  <p class="mt-4 text-gray-600">
    This is not as important and only visible if the user decides to expand
    the bottom drawer.
  </p>

  <button
    type="button"
    class="mt-2 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    Some CTA
  </button>
</app-bottom-drawer>`
})
export class GptOssExampleComponent {}