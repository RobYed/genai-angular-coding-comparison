To implement the **Bottom Drawer Component** in Angular with all the specified requirements, including **Tailwind-driven styling**, **smooth animations**, and proper **accessibility features**, here’s a complete solution structured using best practices in Angular.

---

## 📁 File Structure

```bash
src/app/bottom-drawer/
├── bottom-drawer.component.ts
├── bottom-drawer.component.html
├── bottom-drawer.component.scss
```

---

## 🧩 Component Logic (`bottom-drawer.component.ts`)

```ts
import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-bottom-drawer',
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.scss']
})
export class BottomDrawerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('previewContent') previewContent!: ElementRef;
  @ViewChild('fullContent') fullContent!: ElementRef;

  expanded = false;
  currentHeight = 0;

  private resizeListener!: () => void;

  ngAfterViewInit(): void {
    this.updateHeights();
    this.resizeListener = this.updateHeights.bind(this);
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  toggle(): void {
    this.expanded = !this.expanded;
    this.updateHeights();
  }

  updateHeights(): void {
    // Timeout to ensure DOM updates are reflected
    setTimeout(() => {
      const previewHeight = this.previewContent.nativeElement.scrollHeight;
      const fullHeight = this.fullContent.nativeElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const desiredHeight = this.expanded
        ? previewHeight + fullHeight
        : previewHeight;
      const maxHeight = windowHeight * 0.95;

      this.currentHeight = Math.min(desiredHeight, maxHeight);
    }, 0);
  }
}
```

---

## 💅 UI & Styling (`bottom-drawer.component.scss`)

```scss
.drawer-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  z-index: 10;
  height: auto;
}

.drawer-container::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

---

## 🧾 Template (`bottom-drawer.component.html`)

```html
<div class="drawer-container" [style.height.px]="currentHeight">
  <!-- Handle Button -->
  <button
    class="absolute left-1/2 transform -translate-x-1/2 top-0 mt-1 focus:outline-none focus:ring-2 ring-blue-500 rounded-full p-1"
    (click)="toggle()"
    [attr.aria-expanded]="expanded"
    aria-controls="drawer-content"
    [attr.aria-label]="expanded ? 'Collapse drawer' : 'Expand drawer'"
  >
    <svg
      class="w-6 h-6 text-gray-600 transition-transform duration-300 ease-in-out"
      [class.rotate-180]="expanded"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  </button>

  <!-- Scrollable Content Wrapper -->
  <div id="drawer-content" class="content-wrapper overflow-y-auto p-4 pt-8">
    <!-- Always Visible Preview Content -->
    <div #previewContent class="preview-content">
      <ng-content select="[preview-pontent]"></ng-content>
    </div>

    <!-- Expandable Full Content -->
    <div
      #fullContent
      class="full-content transition-all duration-300 ease-in-out"
      [class.opacity-0.translate-y-2]="!expanded"
      [class.opacity-100.translate-y-0]="expanded"
    >
      <ng-content></ng-content>
    </div>
  </div>
</div>
```

---

## ✅ Usage Example (`parent.component.html`)

```html
<app-bottom-drawer>
  <ng-container preview-pontent>
    <h1 class="text-xl font-semibold">Important Preview</h1>
    <p>This is the always-visible content.</p>
  </ng-container>

  <p>This content is only visible when expanded.</p>
  <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">CTA Button</button>
</app-bottom-drawer>
```

---

## 🔍 Accessibility Features

- **Keyboard Navigation**: Uses a `<button>` for the handle — naturally focusable and operable with Enter/Space.
- **ARIA Attributes**:
  - `aria-expanded`: Indicates the state of the drawer.
  - `aria-controls`: Points to the drawer content.
- **Focus Ring**: Visual feedback for keyboard users via `focus:outline-none focus:ring`.

---

## 📱 Responsive Behavior

- Automatically recalculates height on window resize.
- Caps maximum height at `95vh` to avoid exceeding screen limits.
- Supports mobile touch and orientation changes.

---

## 🎨 Design Highlights

- **Half Circle Handle Area**: Achieved via `::before` pseudo-element.
- **Smooth Transitions**:
  - Height transition using CSS.
  - Opacity and vertical movement on expand/collapse with Tailwind utilities.
- **Tailwind Integration**: Most styling leverages Tailwind utility classes.

---

## ⚠️ Notes

- **Dynamic Content Handling**: If content is loaded asynchronously (e.g., images or API data), consider using `ResizeObserver` or triggering `updateHeights()` manually after data loads.
- **Z-index Management**: Adjust `z-index` if the drawer appears beneath overlays or modals.

---

This implementation provides a **fully functional, accessible, and responsive bottom drawer** component tailored for modern Angular applications.