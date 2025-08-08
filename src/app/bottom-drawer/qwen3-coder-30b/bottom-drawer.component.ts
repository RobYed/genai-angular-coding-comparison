// bottom-drawer.component.ts
import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-drawer',
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.css']
})
export class BottomDrawerComponent implements OnInit {
  @Input() isExpanded = false;
  
  @HostBinding('class') drawerClass = 'h-auto';
  @HostBinding('style.height') contentClass = '';
  fullContentClass = 'h-0 opacity-0';

  constructor() { }

  ngOnInit(): void {
    this.updateClasses();
  }

  toggleDrawer(): void {
    this.isExpanded = !this.isExpanded;
    this.updateClasses();
  }

  private updateClasses(): void {
    if (this.isExpanded) {
      this.drawerClass = 'h-full';
      this.contentClass = 'h-full';
      this.fullContentClass = 'h-auto opacity-100';
    } else {
      this.drawerClass = 'h-auto';
      this.contentClass = 'h-auto';
      this.fullContentClass = 'h-0 opacity-0';
    }
  }
}
