import { Component, inject, signal } from '@angular/core';
import { SettingsService } from '../../../../../services/settings.service';
import { ThemeService } from '../../../../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-settings',
  styleUrl: './settings.scss',
  templateUrl: './settings.html',
})
export class Settings {
  private readonly settingsService = inject(SettingsService);
  private readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);
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
    const currentSection = this.settingsService.currentSection();
    this.settingsService.setNavigationMode(mode);
    if (mode === 'pages') {
      this.router.navigate(['/', currentSection]);
    }
    else {
      this.router.navigate(['/'], {
        fragment: currentSection,
      });
    }
  }
  setTheme(themeName: 'default' | 'second' | 'third'): void {
    this.themeService.setTheme(themeName);
  }
}

