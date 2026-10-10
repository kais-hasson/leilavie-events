import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-leilavie-about',
  styleUrl: './leilavie-about.scss',
  templateUrl: './leilavie-about.html',
})
export class LeilavieAbout {
   text = signal(
    `Leilavie
Sweet sights, Sweet delights.
Events. Gifts. Flowers. Grazing.
Made with love 💕
Dm to order - NJ
Leilavie
Sweet sights, Sweet delights.
Events. Gifts. Flowers. Grazing.
Made with love 💕
Dm to order - NJ
Leilavie
Sweet sights, Sweet delights.
Events. Gifts. Flowers. Grazing.
Made with love 💕
Dm to order - NJ`,
  );
}
