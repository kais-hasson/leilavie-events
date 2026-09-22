import { Component, viewChild } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { RouterOutlet } from '@angular/router';
import { Settings } from './components/settings/settings';

@Component({
  imports: [Header, Footer, RouterOutlet, Settings],
  selector: 'app-public-layout',
  styleUrl: './public-layout.scss',
  templateUrl: './public-layout.html',
})
export class PublicLayout {
  readonly settings = viewChild.required(Settings);
  openSettings(): void {
    this.settings().open();
  }
}
