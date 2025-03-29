import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.css'],
  animations: [
    trigger('drawerContentAnimation', [
      state('collapsed', style({
        opacity: 0,
        transform: 'translateY(-10px)',
        height: '0px',
        overflow: 'hidden'
      })),
      state('expanded', style({
        opacity: 1,
        transform: 'translateY(0)',
        height: '*'
      })),
      transition('collapsed => expanded', [
        animate('300ms ease-out')
      ]),
      transition('expanded => collapsed', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class BottomDrawerComponent {
  isExpanded = false;

  toggle(): void {
    this.isExpanded = !this.isExpanded;
  }
}