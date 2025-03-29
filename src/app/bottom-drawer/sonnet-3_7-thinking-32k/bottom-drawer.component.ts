import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-drawer',
  standalone: true,
  imports: [CommonModule],
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