import { Routes } from '@angular/router';
import { ContentListComponent } from './content-list.component';

export const routes: Routes = [
  { path: '', component: ContentListComponent },
  { path: '**', redirectTo: '' },
];
