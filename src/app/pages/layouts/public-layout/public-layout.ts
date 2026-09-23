import { Component, inject, viewChild } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { RouterOutlet } from '@angular/router';
import { Settings } from './components/settings/settings';
import { Sections } from './components/sections/sections';
import { SettingsService } from '../../../services/settings.service';

@Component({
  imports: [Header, Footer, RouterOutlet, Settings, Sections],
  selector: 'app-public-layout',
  styleUrl: './public-layout.scss',
  templateUrl: './public-layout.html',
})
export class PublicLayout {
  private readonly settingsService = inject(SettingsService);
  readonly settings = viewChild.required(Settings);
  readonly navigationMode = this.settingsService.navigationMode;
  openSettings(): void {
    this.settings().open();
  }
}
