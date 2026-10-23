import { Component, signal } from '@angular/core';
import { ScrollRevealDirective } from '../../../@shared/directives/scroll-reveal.directive';

interface ServiceItem {
  title: string;
  image: string;
}

@Component({
  imports: [ScrollRevealDirective],
  selector: 'app-our-services',
  styleUrl: './our-services.scss',
  templateUrl: './our-services.html',
})
export class OurServices {
  readonly eyebrow = signal('Our Services');
  readonly heading = signal('Everything you need for a special moment');
  readonly services = signal<ServiceItem[]>([
    { title: 'Flowers & Gift Boxes', image: '/assets/img/img.png' },
    { title: 'Grazing & Sweet Tables', image: '/assets/img/2.jpg' },
    { title: 'Perfume Bar', image: '/assets/img/li.jpg' },
    { title: 'Event Styling & Décor', image: '/assets/img/3.jpg' },
  ]);
}
