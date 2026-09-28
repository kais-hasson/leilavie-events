import { Component, signal } from '@angular/core';
import { ImageSliderAnimations } from '../../@shared/components/image-slider-animations/image-slider-animations';

@Component({
  imports: [ImageSliderAnimations],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  text = signal(
    `Leilavie
Sweet sights, Sweet delights.
Events. Gifts. Flowers. Grazing.
Made with love 💕
Dm to order - NJ`,
  );
  readonly homeImages = [
    'assets/img/li.jpg',
    'assets/img/img.jpg',
    'assets/img/li.jpg',
    'assets/img/2.jpg',
    'assets/img/3.jpg',
    'assets/img/4.jpg',
  ];
}
