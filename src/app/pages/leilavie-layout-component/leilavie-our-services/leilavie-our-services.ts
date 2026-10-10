import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-leilavie-our-services',
  styleUrl: './leilavie-our-services.scss',
  templateUrl: './leilavie-our-services.html',
})
export class LeilavieOurServices {

    text = signal(
    `Leilavie
Sweet sights, Sweet delights.
Events. Gifts. Flowers. Grazing.
Made with love 💕
Dm to order - NJ`,
  );
}
