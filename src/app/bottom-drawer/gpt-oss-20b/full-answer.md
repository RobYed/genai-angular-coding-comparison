<|channel|>analysis<|message|>Need to provide Angular component code: .ts, .html, .scss (or tailwind). Provide usage example. Mention content projection with selector attribute preview-pontent. Use @ContentChild for preview? Use ng-content select="[preview-pontent]" etc.

Implement handle button with chevron up/down using svg or Unicode. Manage state expanded boolean. Use HostBinding for ARIA attributes.

Use Tailwind classes but also custom CSS for half circle.

Provide responsive height: max-height: 100vh; overflow-y:auto.

Animate height via transition on max-height? Could use Angular animation.

Simplify: container div with class relative bottom-0 left-0 right-0 etc. Use tailwind.

Half-circle: pseudo-element before? But easier: add a div absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-5 rounded-t-full bg-white shadow.

Let's craft component.

<|end|>

<|start|>assistant<|channel|>final<|message|>Below is a **complete, ready‑to‑drop Angular component** that fulfils every requirement in the brief.  
It uses:

| Feature | How it’s implemented |
|---------|----------------------|
| Content projection with a `preview-pontent` marker | `<ng-content select="[preview-pontent]"></ng-content>` |
| Two states (collapsed / expanded) | Boolean `expanded` bound to CSS classes & ARIA attributes |
| Handle button with chevron that toggles state | A `<button>` with an SVG icon that switches on state |
| Smooth height transition & content fade/slide animation | Angular animations + Tailwind utilities |
| Accessibility | Keyboard focus, `aria-expanded`, `aria-controls`, visible focus ring |
| Scrollable overflow / viewport‑height guard | `max-h-screen` and `overflow-y-auto` |
| Half‑circle handle extension | An absolutely positioned `<div>` that shares the same shadow as the card |
| Tailwind styling (primary) + a small custom CSS file for the half circle | `app-bottom-drawer.component.scss` |

---

## 1. Component files

### `bottom-drawer.component.ts`

```ts
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-bottom-drawer',
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // Height animation for the drawer container
    trigger('drawerHeight', [
      state(
        'collapsed',
        style({
          height: '{{ collapsedHeight }}px',
        }),
        { params: { collapsedHeight: 80 } }
      ),
      state(
        'expanded',
        style({
          height: 'auto',
        })
      ),
      transition('collapsed <=> expanded', animate('300ms ease')),
    ]),
    // Fade / slide for the full content
    trigger('fullContent', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '250ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'translateY(20px)' })
        ),
      ]),
    ]),
  ],
})
export class BottomDrawerComponent {
  /** @internal */ expanded = false;

  /** Handle the ARIA attribute for screen readers */
  @HostBinding('attr.aria-expanded') get ariaExpanded() {
    return this.expanded;
  }

  /** Reference to the drawer container so we can read its height in collapsed state */
  @ViewChild('drawer', { static: true }) drawer!: ElementRef<HTMLDivElement>;

  /** Height of the card when it is collapsed – measured once on init */
  collapsedHeight = 80; // default, will be overwritten

  ngAfterViewInit() {
    // If content changes before animation starts we re‑measure
    this.collapsedHeight = this.drawer.nativeElement.clientHeight;
  }

  /** Toggle between states (click or keyboard) */
  toggle() {
    this.expanded = !this.expanded;
  }
}
```

### `bottom-drawer.component.html`

```html
<div
  #drawer
  class="fixed inset-x-0 bottom-0 mx-auto max-w-full rounded-t-lg bg-white shadow-xl transition-all ease-in-out"
  [@drawerHeight]="expanded ? 'expanded' : { value: 'collapsed', params: { collapsedHeight } }"
  role="region"
  aria-labelledby="bottom-drawer-handle"
>
  <!-- Half‑circle handle -->
  <div class="handle-container">
    <button
      id="bottom-drawer-handle"
      type="button"
      (click)="toggle()"
      class="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full bg-white shadow-md w-10 h-10 flex items-center justify-center mx-auto -mt-5 relative z-20 cursor-pointer"
      [attr.aria-label]="expanded ? 'Collapse drawer' : 'Expand drawer'"
    >
      <!-- Chevron icon -->
      <svg
        class="w-5 h-5 text-indigo-600 transition-transform duration-200"
        [ngClass]="{ 'rotate-180': expanded }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
  </div>

  <!-- Content -->
  <div class="p-4 overflow-y-auto max-h-screen">
    <!-- Preview content – always visible -->
    <ng-content select="[preview-pontent]"></ng-content>

    <!-- Full content – only when expanded -->
    <div
      *ngIf="expanded"
      [@fullContent]
      class="mt-4 space-y-3 opacity-100 transition-opacity duration-200"
    >
      <ng-content></ng-content>
    </div>
  </div>
</div>
```

### `bottom-drawer.component.scss`

```scss
/* Tailwind already gives us most of the styling. This file only contains the half‑circle extension: */

.handle-container {
  position: relative;
  width: 100%;
  /* The pseudo element that extends beyond the top */
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -20px; // half of the handle diameter
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 100% 100% 0 0;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    z-index: -1; /* behind the handle button */
  }
}
```

> **Tip** – If you’re not using a build step that compiles SCSS into CSS (e.g., Angular CLI with `stylePreprocessorOptions`), just copy the content of `.scss` to your global styles or use an inline `<style>` block.

---

## 2. Module

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomDrawerComponent } from './bottom-drawer.component';

@NgModule({
  declarations: [BottomDrawerComponent],
  imports: [CommonModule],
  exports: [BottomDrawerComponent], // make it available to other modules
})
export class BottomDrawerModule {}
```

---

## 3. Usage Example

```html
<!-- app.component.html (or any other component) -->
<app-bottom-drawer>
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
</app-bottom-drawer>
```

> **Result** – A card that sits at the very bottom of the viewport.  
> *Collapsed*: only a small handle + preview text is visible.  
> *Expanded*: the full content slides down, the drawer grows to its natural height (but never exceeds the viewport), and any overflow becomes scrollable.

---

## 4. What you get out‑of‑the‑box

| Feature | How it works |
|---------|--------------|
| **Keyboard navigation** | The handle button is a real `<button>`, so it receives focus, can be activated with `Enter/Space`, and has a visible focus ring (Tailwind’s `focus:ring`). |
| **Screen‑reader support** | `aria-expanded` toggles automatically; the handle also carries an `aria-label` that changes from “Expand drawer” to “Collapse drawer”. The content region is marked as a landmark (`role="region"`) and is labelled by the handle via `aria-labelledby`. |
| **Responsive & mobile friendly** | Uses Tailwind’s responsive utilities. On small screens the card still respects `max-h-screen` so it never overflows the viewport; scrollbars appear if needed. |
| **Animations** | Height transition, fade/slide of the full content, and a smooth chevron rotation all happen with Angular animations (no external libs). |
| **Customizable** | The component is a single file – swap the Tailwind classes or add more SCSS to tweak colours, shadows, etc. |

Feel free to drop the `BottomDrawerModule` into any feature module, and start using `<app-bottom-drawer>` wherever you need an interactive bottom drawer!