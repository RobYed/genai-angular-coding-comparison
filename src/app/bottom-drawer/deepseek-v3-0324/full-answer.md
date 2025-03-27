# Angular Bottom Drawer Component

Here's a complete implementation of the bottom drawer component following your requirements:

```typescript
// bottom-drawer.component.ts
import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-bottom-drawer',
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BottomDrawerComponent {
  @ViewChild('container') container!: ElementRef;
  @ContentChild('previewContent', { read: TemplateRef }) previewContent?: TemplateRef<any>;

  isExpanded = false;

  toggleDrawer() {
    this.isExpanded = !this.isExpanded;
  }

  @HostListener('window:resize')
  onWindowResize() {
    // Ensure the drawer doesn't exceed viewport height
    if (this.container) {
      const containerEl = this.container.nativeElement;
      const viewportHeight = window.innerHeight;
      containerEl.style.maxHeight = `${viewportHeight}px`;
    }
  }
}
```

```html
<!-- bottom-drawer.component.html -->
<div
  #container
  class="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden"
  [class.max-h-[90vh]]="isExpanded"
  [class.max-h-[200px]]="!isExpanded"
  [attr.aria-expanded]="isExpanded"
>
  <!-- Handle with half-circle container -->
  <div class="relative -top-4 flex justify-center">
    <div
      class="w-10 h-5 bg-white rounded-t-full shadow-lg flex justify-center items-start cursor-pointer"
      (click)="toggleDrawer()"
      [attr.aria-label]="isExpanded ? 'Collapse drawer' : 'Expand drawer'"
      tabindex="0"
      (keydown.enter)="toggleDrawer()"
      (keydown.space)="toggleDrawer(); $event.preventDefault()"
    >
      <svg
        class="w-6 h-6 text-gray-500 transition-transform duration-300"
        [class.rotate-180]="isExpanded"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
      </svg>
    </div>
  </div>

  <!-- Content area -->
  <div class="p-4 overflow-y-auto h-full">
    <!-- Preview content (always visible) -->
    <ng-container *ngIf="previewContent">
      <ng-container [ngTemplateOutlet]="previewContent"></ng-container>
    </ng-container>

    <!-- Full content (visible when expanded) -->
    <div
      class="transition-all duration-300"
      [class.opacity-0]="!isExpanded"
      [class.opacity-100]="isExpanded"
      [class.translate-y-4]="!isExpanded"
      [class.translate-y-0]="isExpanded"
    >
      <ng-content></ng-content>
    </div>
  </div>
</div>
```

```scss
/* bottom-drawer.component.scss */
:host {
  display: contents;
}

/* Ensure proper scrolling behavior */
[preview-pontent] {
  display: contents;
}

/* Focus styles for accessibility */
[tabindex]:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

## Usage Example

Here's how to use the component as shown in your example:

```html
<app-bottom-drawer>
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
</app-bottom-drawer>
```

## Key Features Implemented:

1. **Two-State Behavior**: Collapsed and expanded states with smooth transitions
2. **Visual Design**: 
   - Fixed position at bottom with proper z-index
   - Rounded top corners with shadow
   - Half-circle handle with chevron icon
3. **Content Projection**:
   - Uses `previewContent` template for always-visible content
   - Projects remaining content for expanded state
4. **Accessibility**:
   - ARIA attributes (`aria-expanded`)
   - Keyboard navigation (Enter/Space to toggle)
   - Focus styles
5. **Responsive Behavior**:
   - Handles viewport resizing
   - Scrollable content when exceeding height
   - Mobile-friendly design
6. **Animation**:
   - Smooth height transition
   - Fade and slide animation for full content

The component uses Tailwind CSS for styling with minimal custom CSS, following modern Angular best practices with content projection and template references.