import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-our-services',
  styleUrl: './our-services.scss',
  templateUrl: './our-services.html',
})
export class OurServices {

    text = signal(
    `Leilavie
Sweet sights, Sweet delights.
Events. Gifts. Flowers. Grazing.
Made with love 💕
Dm to order - NJ`,
  );
}
