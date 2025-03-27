import { Component } from '@angular/core';
import { BottomDrawerComponent } from './bottom-drawer.component';

@Component({
  selector: 'app-gemini-example',
  standalone: true,
  imports: [BottomDrawerComponent],
  template: 
    `<app-bottom-drawer>
        <!-- Preview Content - Marked with 'preview-content' -->
        <div preview-content> <!-- Use a div or ng-container -->
            <h2 class="text-lg font-semibold mb-1">Quick Info</h2>
            <p class="text-sm text-gray-600 dark:text-gray-300">This is always visible.</p>
        </div>
    
        <!-- Full Content - Everything else not marked -->
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-md font-medium mb-2">Details</h3>
            <p class="mb-2 text-gray-700 dark:text-gray-300">
                This is additional information that only appears when the drawer is expanded.
                It can contain more detailed text, lists, or interactive elements.
            </p>
            <ul class="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
                <li>Detail item 1</li>
                <li>Detail item 2</li>
            </ul>
            <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                Action Button
            </button>
    
            <!-- Add more content here to test scrolling within the drawer -->
             <p class="mt-4 text-gray-700 dark:text-gray-300">More content...</p>
             <div style="height: 300px; background: lightcoral; margin-top: 10px;">Scroll test inside drawer</div>
             <p class="mt-4 text-gray-700 dark:text-gray-300">End of drawer content.</p>
        </div>
    </app-bottom-drawer>`
})
export class GeminiExampleComponent {}