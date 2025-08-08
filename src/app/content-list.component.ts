import { Component } from '@angular/core';
import { GptOssExampleComponent } from './bottom-drawer/gpt-oss-20b/example.component';
import { Qwen3CoderExampleComponent } from './bottom-drawer/qwen3-coder-30b/example.component';

interface ListItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [Qwen3CoderExampleComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Exploring AI Concepts</h2>
      
      <div class="grid gap-6">
        @for (item of items; track item.id) {
          <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div class="md:flex">
              <div class="md:shrink-0">
                <img class="h-48 w-full object-cover md:h-full md:w-48" src="{{item.imageUrl}}" alt="{{item.title}}">
              </div>
              <div class="p-6">
                <div class="flex items-baseline">
                  @for (tag of item.tags; track tag) {
                    <span class="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide mr-2">
                      {{tag}}
                    </span>
                  }
                </div>
                <h3 class="mt-2 text-xl font-semibold text-gray-900">{{item.title}}</h3>
                <p class="mt-2 text-gray-600">{{item.description}}</p>
                <div class="mt-4">
                  <button class="text-indigo-600 hover:text-indigo-900 font-medium">Learn more →</button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <app-qwen3-coder-example />
    </div>
  `,
})
export class ContentListComponent {
  items: ListItem[] = [
    {
      id: 1,
      title: 'Deep Learning Architectures',
      description:
        'Explore the evolution of neural network architectures, from simple perceptrons to complex deep learning models like CNNs, RNNs, and transformers that power modern AI systems.',
      imageUrl:
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80',
      tags: ['Deep Learning', 'Neural Networks'],
    },
    {
      id: 2,
      title: 'Natural Language Processing',
      description:
        'Discover how AI understands and generates human language, from traditional statistical methods to state-of-the-art language models that can write essays and engage in conversation.',
      imageUrl:
        'https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
      tags: ['NLP', 'Language Models'],
    },
    {
      id: 3,
      title: 'Computer Vision Applications',
      description:
        'Learn how machines interpret visual information using computer vision techniques, enabling applications like facial recognition, object detection, and autonomous driving systems.',
      imageUrl:
        'https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['Vision', 'Image Processing'],
    },
    {
      id: 4,
      title: 'Reinforcement Learning',
      description:
        'Explore how AI agents learn to make decisions by interacting with environments, from game-playing systems like AlphaGo to practical applications in robotics and resource management.',
      imageUrl:
        'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['RL', 'Decision Making'],
    },
    {
      id: 5,
      title: 'AI Ethics and Responsible Development',
      description:
        'Examine the ethical considerations in AI development, including fairness, transparency, privacy, and socioeconomic impact of increasingly powerful automated systems.',
      imageUrl:
        'https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
      tags: ['Ethics', 'Responsible AI'],
    },
    {
      id: 6,
      title: 'AI in Healthcare',
      description:
        'Discover how artificial intelligence is transforming healthcare through medical imaging analysis, drug discovery, personalized treatment plans, and predictive analytics.',
      imageUrl:
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['Healthcare', 'Medical AI'],
    },
  ];
}
