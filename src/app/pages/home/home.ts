import { Component, signal } from '@angular/core';

@Component({
  imports: [],
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
}
