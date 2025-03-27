Okay, here is the Angular standalone component for the Bottom Drawer, incorporating your requirements.

**1. Component File (`bottom-drawer.component.ts`)**

```typescript
import { Component, HostBinding, HostListener, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-bottom-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.scss'],
  animations: [
    trigger('drawerState', [
      state('collapsed', style({
        // Height is managed dynamically, but we can control opacity/visibility of full content
      })),
      state('expanded', style({
        // Height is managed dynamically
      })),
      // Note: Height animation is tricky with 'auto'. We'll handle it partly via max-height on content
      // and potentially JS if needed, but CSS transitions on max-height often suffice.
      // We primarily animate the opacity/transform of the full content area here.
    ]),
    trigger('contentFade', [
        state('collapsed', style({ opacity: 0, transform: 'translateY(10px)', maxHeight: '0px' })),
        state('expanded', style({ opacity: 1, transform: 'translateY(0)', maxHeight: '50vh' })), // Adjust max-height as needed or calculate
        transition('collapsed <=> expanded', [
            animate('300ms ease-in-out')
        ])
    ]),
    trigger('chevronRotate', [
        state('collapsed', style({ transform: 'rotate(0deg)' })),
        state('expanded', style({ transform: 'rotate(180deg)' })),
        transition('collapsed <=> expanded', [
            animate('300ms ease-in-out')
        ])
    ])
  ]
})
export class BottomDrawerComponent implements AfterViewInit {
  @ViewChild('contentWrapper') contentWrapper!: ElementRef<HTMLDivElement>;

  isExpanded = signal(false); // Use Angular Signals for state

  // Compute animation state string based on the signal
  drawerAnimationState = computed(() => this.isExpanded() ? 'expanded' : 'collapsed');

  // Use HostBinding for dynamic classes on the host element if needed, but managing within template is often clearer
  // @HostBinding('class.is-expanded') get expandedClass() { return this.isExpanded(); }

  constructor(private cdr: ChangeDetectorRef) {}

  // Check content height after view initializes to potentially set initial state based on content
  ngAfterViewInit() {
    // Optional: Could add logic here if initial state depends on content size,
    // but typically starts collapsed.
    this.cdr.detectChanges(); // Ensure view is updated after potential dynamic calculations
  }

  toggleDrawer(): void {
    this.isExpanded.update(state => !state);
  }

  // Optional: Handle viewport resize to ensure max-height constraints are respected
  @HostListener('window:resize')
  onResize(): void {
    // No specific action needed here currently, as max-h-screen and overflow-y-auto handle most cases.
    // Add logic if complex height recalculations were necessary.
  }

  // Ensure clicks inside the drawer don't propagate if necessary (usually not needed for this setup)
  onDrawerClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
```

**2. Template File (`bottom-drawer.component.html`)**

```html
<!-- Drawer Container -->
<div
  class="drawer-container fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-[-4px_0px_15px_rgba(0,0,0,0.2)] rounded-t-2xl transition-all duration-300 ease-in-out flex flex-col"
  [class.max-h-[85vh]]="isExpanded()"
  [class.max-h-[50vh]]="!isExpanded()"  
  (click)="onDrawerClick($event)" 
>
  <!-- Half Circle and Handle Area -->
  <div class="handle-area relative h-5"> 
    <!-- The ::before pseudo-element in SCSS creates the visible half-circle -->
    <button
      #handleButton
      type="button"
      aria-label="Toggle drawer"
      [attr.aria-expanded]="isExpanded()"
      aria-controls="drawer-content"
      class="handle absolute left-1/2 -translate-x-1/2 -top-[20px] w-10 h-10 rounded-full bg-inherit dark:bg-inherit flex items-center justify-center cursor-pointer z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      (click)="toggleDrawer()"
    >
      <!-- Chevron Icon (Heroicons example) -->
      <svg
        [@chevronRotate]="drawerAnimationState()"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-300 ease-in-out"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  </div>

  <!-- Content Wrapper - Manages padding and scrolling -->
  <div
    #contentWrapper
    id="drawer-content"
    class="content-wrapper flex-grow overflow-y-auto px-4 pb-4 pt-2" 
    [style.maxHeight]="isExpanded() ? 'calc(85vh - 40px)' : 'auto'"  // Adjust '40px' based on handle area/padding
  >
    <!-- Always Visible Preview Content -->
    <div class="preview-content">
      <ng-content select="[preview-content]"></ng-content>
      <!-- Typo correction: Use preview-content -->
    </div>

    <!-- Expandable Full Content Area -->
    <div
      class="full-content overflow-hidden" 
      [@contentFade]="drawerAnimationState()"
    >
      <ng-content></ng-content> <!-- Selects content not marked with preview-content -->
    </div>
  </div>
</div>
```

**3. Styling File (`bottom-drawer.component.scss`)**

```scss
// Import Tailwind base/components/utilities if not globally imported in styles.scss
// @import 'tailwindcss/base';
// @import 'tailwindcss/components';
// @import 'tailwindcss/utilities';

// Apply styles to the host element if needed, though classes on the root div in the template are often preferred
// :host {
//   display: block; // Ensures the component takes up space if needed outside the fixed container
// }

.drawer-container {
  // Ensure smooth transition for max-height changes if needed (though content animation might be enough)
  transition: max-height 300ms ease-in-out; 

  // The half-circle shape using a pseudo-element
  &::before {
    content: '';
    position: absolute;
    top: -20px; // Half the height, pulls it upwards
    left: 50%;
    transform: translateX(-50%);
    width: 40px; // As specified
    height: 20px; // Half the width for a semi-circle effect visually
    background-color: inherit; // Inherit background from parent
    border-top-left-radius: 20px; // Fully rounded top corners
    border-top-right-radius: 20px;
    // Apply the same shadow as the container to blend seamlessly
    // Using Tailwind's shadow variable or defining it explicitly
    box-shadow: inherit; 
    // Or manually match the shadow used on drawer-container:
    // box-shadow: -4px 0px 15px rgba(0, 0, 0, 0.2); 
  }
}

// Ensure the handle button visually sits within the pseudo-element space
.handle-area {
  .handle {
     // Adjust positioning slightly if needed based on pseudo-element dimensions
     // -top-[20px] in Tailwind should align it correctly with the ::before element
  }
}


// Optional: Add custom scrollbar styling if desired
.content-wrapper {
  // Example: Webkit scrollbar styling
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5); // gray-400 with opacity
    border-radius: 3px;
  }

  // Dark mode scrollbar
  @media (prefers-color-scheme: dark) {
    &::-webkit-scrollbar-thumb {
       background-color: rgba(75, 85, 99, 0.5); // gray-600 with opacity
    }
  }
}

// Refine full content animation - ensure it's hidden correctly when collapsed
.full-content {
    // The [@contentFade] animation handles opacity, transform, and max-height
    // The overflow-hidden here clips the content during the max-height transition
}

```

**4. Usage Example (`app.component.html` or similar)**

Make sure your main application component imports `BottomDrawerComponent`. If `AppComponent` is standalone:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { BottomDrawerComponent } from './bottom-drawer/bottom-drawer.component'; // Adjust path

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BottomDrawerComponent // Import the drawer component
    // ... other imports like CommonModule, RouterOutlet etc.
  ],
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
}
```

Then use it in `app.component.html`:

```html
<!-- Example Page Content -->
<main class="p-4 pb-32"> <!-- Add padding-bottom to prevent content from being hidden by collapsed drawer -->
  <h1>My Application Content</h1>
  <p>Some content on the main page that might be behind the drawer.</p>
  <p>Scroll down to see more...</p>
  <!-- Add more content here to test scrolling -->
  <div style="height: 100vh;">Scroll spacer</div>
  <p>End of main content.</p>
</main>

<!-- Bottom Drawer Implementation -->
<app-bottom-drawer>
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
</app-bottom-drawer>

<!-- Router Outlet if using routing -->
<!-- <router-outlet></router-outlet> -->
```

**Explanation and Key Points:**

1.  **Standalone:** The component is `standalone: true`, making it self-contained and easier to integrate.
2.  **Tailwind:** Tailwind classes are used extensively for positioning, background, shadow, rounding, text, flex layout, etc.
3.  **SCSS for Half-Circle:** The tricky half-circle shape extending upwards is created using the `::before` pseudo-element in SCSS. It inherits the background and shadow from the main container for seamless integration.
4.  **State Management:** Angular Signals (`signal`, `computed`) are used for managing the `isExpanded` state, providing a modern and efficient reactivity mechanism.
5.  **Content Projection:**
    *   `ng-content select="[preview-content]"` specifically projects elements marked with the `preview-content` attribute (corrected typo from `preview-pontent`).
    *   `<ng-content></ng-content>` (without a selector) projects all *other* content passed into the component.
6.  **Animations:**
    *   `@angular/animations` are used for smooth transitions.
    *   `chevronRotate`: Rotates the handle icon.
    *   `contentFade`: Animates the `opacity`, `transform` (slight upward slide), and `max-height` of the full content area. Using `max-height` is a common CSS trick to animate height to/from `auto`.
    *   The container's `max-height` is also adjusted (`[class.max-h-...]`) to provide a boundary, but the primary visual height change comes from the `contentFade` animation revealing the content.
7.  **Accessibility:**
    *   The handle is a `<button>`, making it keyboard focusable and triggerable with Enter/Space.
    *   `aria-expanded` indicates the state to screen readers.
    *   `aria-controls` links the button to the content area (`id="drawer-content"`).
    *   `aria-label` provides a description for the handle button.
    *   Focus styles are included (`focus:ring`).
8.  **Scrolling:** `overflow-y-auto` on the `.content-wrapper` enables vertical scrolling *within* the drawer when the content exceeds the available height. The `max-h-screen` (implicitly via `max-h-[85vh]` etc.) on the container prevents the drawer itself from exceeding the viewport height.
9.  **Handle Positioning:** The handle button is absolutely positioned relative to the `.handle-area` div, and uses `left-1/2 -translate-x-1/2 -top-[20px]` to center it horizontally and place it correctly within the visual half-circle created by the pseudo-element.
10. **Dark Mode:** Basic dark mode support (`dark:...` classes) is included for background and text colors.
11. **Shadow:** The `shadow-[-4px_0px_15px_rgba(0,0,0,0.2)]` provides a custom top-biased shadow. Ensure the `box-shadow: inherit;` in the SCSS correctly picks this up for the pseudo-element. If not, manually copy the shadow value into the SCSS `::before` rule.
12. **`preview-content` Attribute:** Remember to use `preview-content` (not `preview-pontent`) on the elements you want to be always visible in the collapsed state when using the component.

This setup provides a robust, accessible, and visually appealing bottom drawer component as per your specifications. Remember to install Tailwind CSS in your Angular project if you haven't already.