import { Component } from '@angular/core';
import { BottomDrawerComponent } from './bottom-drawer.component';

@Component({
  selector: 'app-deepseek-v3-example',
  standalone: true
  imports: [BottomDrawerComponent]
  template: 
   `<app-bottom-drawer>
      <ng-container *previewContent>
        <h1 class="text-xl font-bold">Great heading</h1>
        <p class="text-gray-700">This is important information which always needs to be present</p>
      </ng-container>
    
      <p class="mt-4 text-gray-600">
        This is not as important and only visible if the user decides to expand the bottom drawer
      </p>
      <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        Some CTA
      </button>
    </app-bottom-drawer>`
})
export DeepseekV3ExampleComponent {}