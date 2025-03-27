import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-gray-800 text-white py-8 mt-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <h3 class="text-xl font-bold">GenAI Angular Playground</h3>
            <p class="text-gray-400 mt-2">Exploring the capabilities of modern AI with Angular</p>
          </div>
          <div class="flex space-x-4">
            <a href="#" class="hover:text-indigo-400 transition-colors">Twitter</a>
            <a href="#" class="hover:text-indigo-400 transition-colors">GitHub</a>
            <a href="#" class="hover:text-indigo-400 transition-colors">LinkedIn</a>
            <a href="#" class="hover:text-indigo-400 transition-colors">Contact</a>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© 2025 GenAI Angular Playground. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}