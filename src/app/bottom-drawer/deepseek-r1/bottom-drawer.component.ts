import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-bottom-drawer',
  standalone: true,
  imports: [CommonModule],
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
    setTimeout(() => this.updateCollapsedMaxHeight(), 30);
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