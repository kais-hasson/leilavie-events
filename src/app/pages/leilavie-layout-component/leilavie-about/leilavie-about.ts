import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../@shared/directives/scroll-reveal.directive';

@Component({
  imports: [RouterLink, ScrollRevealDirective],
  selector: 'app-leilavie-about',
  styleUrl: './leilavie-about.scss',
  templateUrl: './leilavie-about.html',
})
export class LeilavieAbout {
  readonly eyebrow = signal('About Leilavie');
  readonly heading = signal(['More Than Just Events,', "It's a Feeling"]);
  readonly description = signal(
    'At Leilavie, we believe every celebration deserves to be extraordinary. We specialize in creating beautifully curated experiences — from elegant floral arrangements and luxurious grazing tables to themed carts and full event planning.',
  );
  readonly tagline = signal('Sweet sights, sweet delights ♡');
}
