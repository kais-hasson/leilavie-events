import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageSliderAnimations } from '../../../@shared/components/image-slider-animations/image-slider-animations';
import { ScrollRevealDirective } from '../../../@shared/directives/scroll-reveal.directive';
import { SettingsService } from '../../../services/settings.service';

@Component({
  imports: [ImageSliderAnimations, NgClass, RouterLink, ScrollRevealDirective],
  selector: 'app-leilavie-home',
  styleUrl: './leilavie-home.scss',
  templateUrl: './leilavie-home.html',
})
export class LeilavieHome {
  private readonly settingsService = inject(SettingsService);
  readonly navigationMode = this.settingsService.navigationMode;
  readonly eyebrow = signal('Welcome to Leilavie');
  readonly heading = signal(['Sweet sights,', 'Sweet delights.']);
  readonly description = signal(
    'Events, gifts, flowers & grazing tables — all made with love 💕. DM to order (NJ).',
  );
  readonly homeImages = [
    'assets/img/li.jpg',
    'assets/img/img.png',
    'assets/img/2.jpg',
    'assets/img/3.jpg',
    'assets/img/4.jpg',
  ];
}
