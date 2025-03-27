import { Component } from '@angular/core';
import { BottomDrawerComponent } from './bottom-drawer.component';

@Component({
  selector: 'app-o3-mini-example',
  standalone: true
  imports: [BottomDrawerComponent]
  template: 
    `<app-bottom-drawer>
  <ng-container preview-pontent>
    <h1>Great heading</h1>
    <p>This is important information which always needs to be present</p>
  </ng-container>

  <p>
    This is not as important and only visible if the user decides to expand
    the bottom drawer
  </p>
  <button>Some CTA</button>
</app-bottom-drawer>`
})
export O3MiniExampleComponent {}