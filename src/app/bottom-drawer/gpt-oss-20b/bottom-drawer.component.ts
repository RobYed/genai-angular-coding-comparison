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
