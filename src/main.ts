import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './app/header.component';
import { ContentListComponent } from './app/content-list.component';
import { FooterComponent } from './app/footer.component';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-header></app-header>
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
});