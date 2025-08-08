import { Component } from "@angular/core";
import { BottomDrawerComponent } from "./bottom-drawer.component";

@Component({
  selector: 'app-opus-4-example',
  standalone: true,
  imports: [BottomDrawerComponent],
  template: `
    <div class="min-h-screen bg-gray-100 p-8">
      <h1 class="text-3xl font-bold mb-4">Bottom Drawer Example</h1>
      <p class="mb-8">Scroll down to see the bottom drawer component.</p>
      
      <div class="h-96 bg-white rounded-lg shadow p-6 mb-8">
        <p>Main content area</p>
      </div>

      <app-bottom-drawer>
        <ng-container preview-content>
          <h2 class="text-xl font-semibold mb-2">Great heading</h2>
          <p class="text-gray-600">This is important information which always needs to be present</p>
        </ng-container>

        <p class="text-gray-700 mb-4">
          This is not as important and only visible if the user decides to expand
          the bottom drawer. Here you can add more detailed information, forms,
          or any other content that should be hidden by default.
        </p>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Some CTA
        </button>
        
        <!-- Add more content to demonstrate scrolling -->
        <div class="mt-6 space-y-4">
          <p class="text-gray-700">Additional content can be added here...</p>
          <p class="text-gray-700">And it will scroll if needed when the content exceeds the viewport height.</p>
        </div>
      </app-bottom-drawer>
    </div>
  `
})
export class Opus4ExampleComponent {}
