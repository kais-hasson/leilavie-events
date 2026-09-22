import { Component, inject, signal } from '@angular/core';
import { SettingsService } from '../../../../../services/settings.service';
import { ThemeService } from '../../../../../services/theme.service';

@Component({
  imports: [],
  selector: 'app-settings',
  styleUrl: './settings.scss',
  templateUrl: './settings.html',
})
export class Settings {
  private readonly settingsService = inject(SettingsService);
  private readonly themeService = inject(ThemeService);
  readonly isOpen = signal(false);
  readonly navigationMode = this.settingsService.navigationMode;
  readonly theme = this.themeService.theme;
  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  setNavigationMode(mode: 'single-page' | 'pages'): void {
    this.settingsService.setNavigationMode(mode);
  }
  setTheme(themeName: 'default' | 'second' | 'third'): void {
    this.themeService.setTheme(themeName);
  }
}

