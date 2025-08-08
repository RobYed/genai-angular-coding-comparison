import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-bottom-drawer',
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.scss'],
  standalone: true,
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