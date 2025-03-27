Below is one complete solution. In this example the bottom drawer is implemented as an Angular component (using Angular’s animations and content projection) with Tailwind CSS classes for most styling. You’ll get three files:

1. **`bottom-drawer.component.ts`**  
2. **`bottom-drawer.component.html`**  
3. **`bottom-drawer.component.css`** *(minimal, as Tailwind is used)*

Feel free to adjust timing values, animation details, or styles as needed.

---

### 1. bottom-drawer.component.ts

```typescript
import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-bottom-drawer',
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.css'],
  animations: [
    trigger('drawerContentAnimation', [
      state('collapsed', style({
        opacity: 0,
        transform: 'translateY(-10px)',
        height: '0px',
        overflow: 'hidden'
      })),
      state('expanded', style({
        opacity: 1,
        transform: 'translateY(0)',
        height: '*'
      })),
      transition('collapsed => expanded', [
        animate('300ms ease-out')
      ]),
      transition('expanded => collapsed', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class BottomDrawerComponent {
  isExpanded = false;

  toggle(): void {
    this.isExpanded = !this.isExpanded;
  }
}
```

---

### 2. bottom-drawer.component.html

```html
<div class="fixed bottom-0 left-0 right-0 z-50">
  <!-- Card container -->
  <div
    class="relative bg-white rounded-t-lg shadow-lg max-h-screen overflow-y-auto transition-all duration-300"
  >
    <!-- Half circle area with the handle -->
    <div class="absolute inset-x-0 -top-5 flex justify-center">
      <button
        (click)="toggle()"
        tabindex="0"
        class="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center focus:outline-none"
        [attr.aria-expanded]="isExpanded"
        aria-controls="drawer-content"
        aria-label="Toggle Bottom Drawer"
      >
        <svg
          [ngClass]="{'transform rotate-180 transition-transform duration-300': isExpanded}"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </div>

    <!-- Drawer contents -->
    <div class="pt-8 px-4">
      <!-- Always visible preview content (projected via attribute) -->
      <div class="preview-content">
        <ng-content select="[preview-pontent]"></ng-content>
      </div>
      <!-- Fully expanded content for non-preview contents -->
      <div
        id="drawer-content"
        [@drawerContentAnimation]="isExpanded ? 'expanded' : 'collapsed'"
        class="mt-4"
        *ngIf="isExpanded"
      >
        <ng-content select=":not([preview-pontent])"></ng-content>
      </div>
    </div>
  </div>
</div>
```

---

### 3. bottom-drawer.component.css

```css
/* Additional component-specific styles can go here. */
/* With Tailwind managing most of the styling and transitions, this file can be minimal. */
```

---

## Usage Example

Now you can use your new component anywhere in your Angular templates. For example:

```html
<app-bottom-drawer>
  <ng-container preview-pontent>
    <h1>Great heading</h1>
    <p>This is important information which always needs to be present</p>
  </ng-container>

  <p>
    This is not as important and only visible if the user decides to expand
    the bottom drawer
  </p>
  <button>Some CTA</button>
</app-bottom-drawer>
```

---

## Explanation

- **Container & Layout:**  
  The outermost `<div>` is fixed to the bottom of the viewport with a high z-index. The inner card has a rounded top via Tailwind’s `rounded-t-lg`, a drop shadow (`shadow-lg`), and its maximum height is set to the screen height (`max-h-screen`) so that overflow becomes scrollable.

- **Half Circle & Handle:**  
  A half-circle “area” is created by positioning a button with a white background and a rounded-full shape. It is absolutely positioned to overlap the top edge of the card. The button shows a chevron SVG that rotates when the drawer is expanded.

- **Content Projection:**  
  The component uses two `<ng-content>` sections with selectors. The first always shows anything marked with the attribute `preview-pontent` (note the spelling used in the instructions). The second (using `:not([preview-pontent])`) renders the rest of the projected content and is only displayed (with an animation) when in an expanded state.

- **Animations:**  
  Angular’s animation API is used to smoothly transition the opacity, translation, and height of the additional content when toggling the drawer state.

- **Accessibility:**  
  The handle is a button with proper ARIA attributes (`aria-expanded` and `aria-controls`), and it’s keyboard-focusable.

This implementation follows Angular best practices while using Tailwind CSS for styling. Happy coding!