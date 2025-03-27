```typescript
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-bottom-drawer',
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.css'],
  animations: [
    trigger('drawerState', [
      state('collapsed', style({
        height: '{{ collapsedHeight }}px',
      }), { params: { collapsedHeight: 0 } }),
      state('expanded', style({
        height: '{{ expandedHeight }}px',
      }), { params: { expandedHeight: 300 } }),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ]),
    trigger('contentFade', [
      state('collapsed', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      state('expanded', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('collapsed => expanded', [
        animate('250ms 50ms ease-in-out')
      ]),
      transition('expanded => collapsed', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class BottomDrawerComponent implements OnInit, AfterViewInit {
  @ViewChild('previewContentContainer') previewContentContainer!: ElementRef;
  @ViewChild('fullContentContainer') fullContentContainer!: ElementRef;
  @ViewChild('drawerContainer') drawerContainer!: ElementRef;

  isExpanded = false;
  collapsedHeight = 0;
  expandedHeight = 0;
  maxHeight = 0;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.calculateMaxHeight();
  }

  ngAfterViewInit(): void {
    // Calculate initial heights after view is initialized
    setTimeout(() => {
      this.calculateHeights();
      this.cd.detectChanges();
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.calculateMaxHeight();
    this.calculateHeights();
    this.cd.detectChanges();
  }

  toggleDrawer(): void {
    this.isExpanded = !this.isExpanded;
  }
  
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Only handle keyboard events for the button
    if (event.target && (event.target as HTMLElement).tagName === 'BUTTON') {
      event.preventDefault();
      this.toggleDrawer();
    }
  }

  private calculateHeights(): void {
    // Get preview content height for collapsed state
    const previewHeight = this.previewContentContainer.nativeElement.offsetHeight;
    this.collapsedHeight = previewHeight + 20; // Add some padding

    // Calculate the full height for expanded state
    const fullContentHeight = this.fullContentContainer.nativeElement.scrollHeight;
    this.expandedHeight = Math.min(previewHeight + fullContentHeight + 40, this.maxHeight);

    // Set a CSS variable for the preview content height to use in managing scrollable area
    document.documentElement.style.setProperty('--preview-content-height', `${previewHeight + 40}px`);
  }

  private calculateMaxHeight(): void {
    // Set max height to be viewport height minus a small margin
    this.maxHeight = window.innerHeight - 20;
  }

  get drawerAnimationState() {
    return {
      value: this.isExpanded ? 'expanded' : 'collapsed',
      params: {
        collapsedHeight: this.collapsedHeight,
        expandedHeight: this.expandedHeight
      }
    };
  }

  get contentAnimationState() {
    return this.isExpanded ? 'expanded' : 'collapsed';
  }
}
```

```html
<div class="fixed bottom-0 left-0 right-0 flex flex-col items-center z-50">
  <!-- Handle button -->
  <button 
    class="w-10 h-10 bg-white rounded-full shadow-md flex justify-center items-center focus:outline-none relative z-10"
    (click)="toggleDrawer()"
    [attr.aria-expanded]="isExpanded"
    aria-controls="drawer-content">
    <span class="transform transition-transform duration-300" [ngClass]="{'rotate-180': isExpanded}">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
    </span>
    <span class="sr-only">{{ isExpanded ? 'Collapse' : 'Expand' }} drawer</span>
  </button>
  
  <!-- Main drawer container -->
  <div 
    class="w-full bg-white rounded-t-lg shadow-lg overflow-hidden -mt-5 pt-5"
    [@drawerState]="drawerAnimationState"
    #drawerContainer>
    
    <div class="px-4 pb-4">
      <!-- Preview content (always visible) -->
      <div class="w-full" #previewContentContainer>
        <ng-content select="[preview-pontent]"></ng-content>
      </div>
      
      <!-- Full content (only visible when expanded) -->
      <div 
        id="drawer-content"
        class="w-full pt-4" 
        [ngClass]="{'overflow-y-auto': isExpanded}"
        [@contentFade]="contentAnimationState"
        [class.hidden]="!isExpanded"
        #fullContentContainer>
        <ng-content></ng-content>
      </div>
    </div>
  </div>
</div>
```

```css
:root {
  --preview-content-height: 80px;
}

/* For screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* For the full content scrollable area */
#drawer-content.overflow-y-auto {
  max-height: calc(100vh - 60px - var(--preview-content-height));
  overflow-y: auto;
}
```

Would you like me to explain or break down the code?