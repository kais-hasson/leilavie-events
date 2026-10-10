import { Component, signal } from '@angular/core';
import { ImageSliderAnimations } from '../../../@shared/components/image-slider-animations/image-slider-animations';

@Component({
  imports: [ImageSliderAnimations],
  selector: 'app-leilavie-home',
  styleUrl: './leilavie-home.scss',
  templateUrl: './leilavie-home.html',
})
export class LeilavieHome {
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
