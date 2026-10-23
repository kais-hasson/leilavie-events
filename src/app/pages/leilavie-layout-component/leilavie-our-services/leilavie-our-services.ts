import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ScrollRevealDirective } from '../../../@shared/directives/scroll-reveal.directive';

interface ServiceItem {
  title: string;
  image: string;
}

@Component({
  imports: [NgClass, ScrollRevealDirective],
  selector: 'app-leilavie-our-services',
  styleUrl: './leilavie-our-services.scss',
  templateUrl: './leilavie-our-services.html',
})
export class LeilavieOurServices {
  readonly eyebrow = signal('Our Services');
  readonly heading = signal('Everything You Need for a Special Moment');
  readonly services = signal<ServiceItem[]>([
    { title: 'Custom Flowers & Gift Boxes', image: '/assets/img/img.png' },
    { title: 'Grazing & Sweet Tables', image: '/assets/img/2.jpg' },
    { title: 'Perfume Bar', image: '/assets/img/li.jpg' },
    { title: 'Event Planning & Décor', image: '/assets/img/3.jpg' },
    { title: 'Mini Pancakes & Waffles Cart', image: '/assets/img/4.jpg' },
  ]);
}
