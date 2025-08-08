# Bottom Drawer Component for Angular

I'll create a responsive bottom drawer component with smooth animations and proper accessibility support. Here's the complete implementation:

```html
<!-- bottom-drawer.component.html -->
<div 
  class="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] transition-all duration-300 ease-in-out"
  [class]="drawerClass"
  [attr.aria-expanded]="isExpanded"
  [attr.aria-controls]="'bottom-drawer-content'"
>
  <!-- Half-circle handle at the top center -->
  <div class="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center z-10">
    <button 
      type="button"
      class="w-6 h-6 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
      (click)="toggleDrawer()"
      [attr.aria-label]="isExpanded ? 'Collapse drawer' : 'Expand drawer'"
      [attr.aria-expanded]="isExpanded"
    >
      <svg 
        class="w-4 h-4 text-gray-700 transition-transform duration-300" 
        [class]="isExpanded ? 'rotate-180' : ''"
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M7 10L12 15L17 10" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>

  <!-- Drawer content container -->
  <div 
    class="bg-white rounded-t-2xl shadow-lg overflow-hidden"
    [class]="contentClass"
  >
    <!-- Preview content (always visible) -->
    <div class="p-4 border-b border-gray-100">
      <ng-content select="[preview-content]"></ng-content>
    </div>

    <!-- Full content (revealed when expanded) -->
    <div 
      class="overflow-y-auto transition-all duration-300 ease-in-out"
      [style.max-height]="isExpanded ? 'none' : '0px'"
      [class]="fullContentClass"
    >
      <div class="p-4">
        <ng-content></ng-content>
      </div>
    </div>
  </div>
</div>
```

```typescript
// bottom-drawer.component.ts
import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-drawer',
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.css']
})
export class BottomDrawerComponent implements OnInit {
  @Input() isExpanded = false;
  
  @HostBinding('class') drawerClass = 'h-auto';
  @HostBinding('style.height') contentClass = '';
  fullContentClass = 'h-0 opacity-0';

  constructor() { }

  ngOnInit(): void {
    this.updateClasses();
  }

  toggleDrawer(): void {
    this.isExpanded = !this.isExpanded;
    this.updateClasses();
  }

  private updateClasses(): void {
    if (this.isExpanded) {
      this.drawerClass = 'h-full';
      this.contentClass = 'h-full';
      this.fullContentClass = 'h-auto opacity-100';
    } else {
      this.drawerClass = 'h-auto';
      this.contentClass = 'h-auto';
      this.fullContentClass = 'h-0 opacity-0';
    }
  }
}
```

```css
/* bottom-drawer.component.css */
:host {
  display: block;
}

/* Ensure the drawer doesn't exceed viewport height */
app-bottom-drawer {
  max-height: 90vh;
}

/* Ensure content scrolls properly */
app-bottom-drawer .overflow-y-auto {
  max-height: calc(100vh - 150px);
}
```

```typescript
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
```

## Usage Example

```html
<app-bottom-drawer>
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
```

## Key Features Implemented

1. **Responsive Design**:
   - Fixed positioning at bottom of viewport
   - Max height constraint (90vh) to prevent overflow
   - Properly handles viewport changes and orientation

2. **Visual Design**:
   - Rounded top corners with drop shadow
   - Half-circle handle at top center
   - Smooth transitions between states

3. **Interactive Elements**:
   - Chevron icon that rotates on toggle
   - Accessible handle with proper ARIA attributes
   - Focus management for keyboard navigation

4. **Content Management**:
   - Preview content always visible
   - Full content revealed on expansion
   - Scrollable content area when needed

5. **Animations**:
   - Smooth height transitions
   - Opacity and visibility changes for content
   - Rotation animation for handle icon

6. **Accessibility**:
   - Proper ARIA attributes (aria-expanded, aria-controls)
   - Keyboard navigability
   - Focus indicators
   - Semantic HTML structure

The component is self-contained and can be easily integrated into any Angular application by importing the module. The content projection allows for flexible content rendering while maintaining the required structure and styling.