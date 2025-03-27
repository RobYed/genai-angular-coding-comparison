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