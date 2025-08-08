// bottom-drawer.component.ts
import { Component, HostListener, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-bottom-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out"
      [class.pointer-events-none]="!isInitialized"
    >
      <div 
        #drawerContainer
        class="relative bg-white rounded-t-2xl shadow-lg transition-all duration-300 ease-in-out mx-4 sm:mx-auto sm:max-w-2xl"
        [style.max-height.px]="maxHeight"
        [attr.aria-expanded]="isExpanded"
      >
        <!-- Half circle handle container -->
        <div class="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <div class="relative w-10 h-5 bg-white rounded-t-full shadow-lg">
            <button
              #toggleButton
              (click)="toggleDrawer()"
              class="absolute inset-0 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-t-full"
              [attr.aria-label]="isExpanded ? 'Collapse drawer' : 'Expand drawer'"
              [attr.aria-expanded]="isExpanded"
              aria-controls="drawer-content"
            >
              <svg 
                class="w-5 h-5 text-gray-600 transition-transform duration-300"
                [class.rotate-180]="isExpanded"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Content container -->
        <div 
          #contentWrapper
          id="drawer-content"
          class="overflow-hidden transition-all duration-300 ease-in-out"
          [style.height.px]="contentHeight"
        >
          <div 
            #scrollContainer
            class="overflow-y-auto"
            [style.max-height.px]="maxHeight"
          >
            <div class="p-6 pt-8">
              <!-- Preview content (always visible) -->
              <div class="preview-content">
                <ng-content select="[preview-content]"></ng-content>
              </div>

              <!-- Full content (visible when expanded) -->
              <div 
                #fullContent
                class="full-content transition-all duration-300 ease-in-out"
                [class.opacity-0]="!isExpanded"
                [class.translate-y-4]="!isExpanded"
                [class.opacity-100]="isExpanded"
                [class.translate-y-0]="isExpanded"
                [class.mt-4]="isExpanded"
                [@expandCollapse]="isExpanded ? 'expanded' : 'collapsed'"
              >
                <ng-content></ng-content>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Custom shadow for the half-circle to match the card */
    .shadow-lg {
      box-shadow: 0 -10px 25px -5px rgba(0, 0, 0, 0.1), 0 -10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    /* Ensure smooth transitions */
    .transition-all {
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Hide full content initially */
    .full-content:not(.opacity-100) {
      display: none;
    }

    .full-content.opacity-100 {
      display: block;
    }
  `],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        opacity: 0,
        transform: 'translateY(1rem)',
        display: 'none'
      })),
      state('expanded', style({
        opacity: 1,
        transform: 'translateY(0)',
        display: 'block'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class BottomDrawerComponent implements AfterViewInit {
  @ViewChild('drawerContainer') drawerContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('contentWrapper') contentWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('fullContent') fullContent!: ElementRef<HTMLDivElement>;
  @ViewChild('toggleButton') toggleButton!: ElementRef<HTMLButtonElement>;

  isExpanded = false;
  isInitialized = false;
  contentHeight = 0;
  maxHeight = 0;
  private previewHeight = 0;
  private fullContentHeight = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Initial setup with a slight delay to ensure content is rendered
    setTimeout(() => {
      this.calculateHeights();
      this.setInitialHeight();
      this.isInitialized = true;
      this.cdr.detectChanges();
    }, 0);
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.calculateHeights();
    this.updateHeight();
  }

  toggleDrawer() {
    this.isExpanded = !this.isExpanded;
    this.updateHeight();
    
    // Announce state change for screen readers
    this.announceStateChange();
  }

  private calculateHeights() {
    // Calculate maximum height (viewport height minus some margin)
    this.maxHeight = window.innerHeight - 100;

    // Get preview content height
    const previewContent = this.drawerContainer.nativeElement.querySelector('.preview-content');
    if (previewContent) {
      this.previewHeight = previewContent.scrollHeight + 64; // Including padding
    }

    // Get full content height
    if (this.fullContent) {
      // Temporarily show to measure
      const wasHidden = !this.isExpanded;
      if (wasHidden) {
        this.fullContent.nativeElement.style.display = 'block';
        this.fullContent.nativeElement.style.opacity = '0';
      }
      
      this.fullContentHeight = this.scrollContainer.nativeElement.scrollHeight;
      
      if (wasHidden) {
        this.fullContent.nativeElement.style.display = '';
        this.fullContent.nativeElement.style.opacity = '';
      }
    }
  }

  private setInitialHeight() {
    this.contentHeight = this.previewHeight;
  }

  private updateHeight() {
    if (this.isExpanded) {
      const targetHeight = Math.min(this.fullContentHeight, this.maxHeight);
      this.contentHeight = targetHeight;
    } else {
      this.contentHeight = this.previewHeight;
    }
  }

  private announceStateChange() {
    // Create a live region announcement for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = this.isExpanded ? 'Drawer expanded' : 'Drawer collapsed';
    
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }
}

// Example usage component
@Component({
  selector: 'app-example',
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
export class ExampleComponent {}

// Module setup (if not using standalone components)
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// 
// @NgModule({
//   declarations: [],
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     BottomDrawerComponent,
//     ExampleComponent
//   ],
//   providers: [],
//   bootstrap: []
// })
// export class AppModule { }