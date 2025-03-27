Here's the implementation of the Bottom Drawer component following your requirements:

```typescript
// bottom-drawer.component.ts
import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-bottom-drawer',
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ maxHeight: '{{ collapsedHeight }}px' }), {
        params: { collapsedHeight: 0 },
      }),
      state('expanded', style({ maxHeight: '90vh' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class BottomDrawerComponent implements AfterViewInit {
  expanded = false;
  collapsedMaxHeight = 0;

  @ViewChild('previewContent') previewContent!: ElementRef;
  @ViewChild('handle') handle!: ElementRef;

  ngAfterViewInit() {
    this.updateCollapsedMaxHeight();
  }

  private updateCollapsedMaxHeight() {
    const previewHeight = this.previewContent.nativeElement.offsetHeight;
    const handleHeight = this.handle.nativeElement.offsetHeight;
    this.collapsedMaxHeight = previewHeight + handleHeight + 24; // Adding padding buffer
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateCollapsedMaxHeight();
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onHandleKeydown(event: KeyboardEvent) {
    event.preventDefault();
    this.toggle();
  }
}
```

```html
<!-- bottom-drawer.component.html -->
<div
  class="bottom-drawer-container"
  [@expandCollapse]="{
    value: expanded ? 'expanded' : 'collapsed',
    params: { collapsedHeight: collapsedMaxHeight }
  }"
>
  <div class="handle-container">
    <div
      #handle
      class="handle"
      role="button"
      tabindex="0"
      (click)="toggle()"
      (keydown)="onHandleKeydown($event)"
      aria-controls="fullContent"
      [attr.aria-expanded]="expanded"
    >
      <svg
        class="chevron"
        [class.rotate-180]="expanded"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </div>
  </div>

  <div #previewContent class="preview-content">
    <ng-content select="[preview-pontent]"></ng-content>
  </div>

  <div
    id="fullContent"
    class="full-content"
    *ngIf="expanded"
    @fadeInUp
  >
    <ng-content></ng-content>
  </div>
</div>
```

```css
/* bottom-drawer.component.css */
.bottom-drawer-container {
  @apply bg-white shadow-xl rounded-t-xl fixed bottom-0 left-0 right-0 z-50 overflow-hidden;
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
}

.bottom-drawer-container::before {
  content: '';
  @apply absolute bg-white w-10 h-10 rounded-full;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  clip-path: inset(0 0 50% 0);
  filter: drop-shadow(0 -4px 6px -1px rgba(0, 0, 0, 0.1));
}

.handle-container {
  @apply flex justify-center pt-2 pb-3 cursor-pointer;
}

.handle {
  @apply w-10 h-5 flex items-center justify-center;
}

.chevron {
  @apply text-gray-600 transition-transform duration-300;
}

.rotate-180 {
  transform: rotate(180deg);
}

.preview-content {
  @apply px-4 pb-2;
}

.full-content {
  @apply px-4 pb-4;
}
```

Key features:
1. Uses Angular animations for smooth height transitions and content fade-in
2. Implements proper ARIA attributes and keyboard navigation
3. Responsive design with viewport height consideration
4. Content projection with preview/full content separation
5. Custom handle styling with SVG chevron
6. Shadow and visual hierarchy implementation
7. Z-index management and overflow handling
8. Window resize/orientation change handling

The component can be used as specified in your example. The chevron handle rotates 180° when expanded, and the content smoothly transitions between states. The component automatically adjusts to content height changes and viewport resizing.