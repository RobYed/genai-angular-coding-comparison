import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="bg-indigo-600 shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-white">GenAI Angular Playground</h1>
          <nav>
            <ul class="flex space-x-6">
              <li><a routerLink="/" routerLinkActive="text-indigo-200" [routerLinkActiveOptions]="{exact: true}" class="text-white hover:text-indigo-200 font-medium">Home</a></li>
              <li><a href="#" class="text-white hover:text-indigo-200 font-medium">About</a></li>
              <li><a href="#" class="text-white hover:text-indigo-200 font-medium">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {}