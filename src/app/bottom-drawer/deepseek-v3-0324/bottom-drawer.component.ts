import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-bottom-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BottomDrawerComponent {
  @ViewChild('container') container!: ElementRef;
  @ContentChild('previewContent', { read: TemplateRef }) previewContent?: TemplateRef<any>;

  isExpanded = false;

  toggleDrawer() {
    this.isExpanded = !this.isExpanded;
  }

  @HostListener('window:resize')
  onWindowResize() {
    // Ensure the drawer doesn't exceed viewport height
    if (this.container) {
      const containerEl = this.container.nativeElement;
      const viewportHeight = window.innerHeight;
      containerEl.style.maxHeight = `${viewportHeight}px`;
    }
  }
}