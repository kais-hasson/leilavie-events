import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { SettingsService } from '../../../services/settings.service';
import { ThemeService } from '../../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  imports: [NgClass],
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
  readonly layout = this.settingsService.layout;
  readonly theme = this.themeService.theme;
  readonly themeName = this.themeService.themeName;
  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  setNavigationMode(mode: 'single-page' | 'pages'): void {
    const previousMode = this.settingsService.navigationMode();
    if (mode === 'pages') {
      const currentSection = this.settingsService.currentSection();
      this.settingsService.setNavigationMode(mode);
      this.router.navigate(['/', currentSection], { onSameUrlNavigation: 'reload' });
    } else {
      const targetSection =
        previousMode === 'pages'
          ? this.currentRouteSection()
          : this.settingsService.currentSection();
      this.settingsService.setNavigationMode(mode);
      this.settingsService.setCurrentSection(targetSection);
      this.router
        .navigate(['/'], { fragment: targetSection, onSameUrlNavigation: 'reload' })
        .then(() => {
          document.getElementById(targetSection)?.scrollIntoView();
        });
    }
  }

  private currentRouteSection(): string {
    const path = this.router.url.split(/[?#]/)[0].replace(/^\/+/, '');
    return path || 'home';
  }
  setTheme(themeName: 'fourth' | 'second' | 'third' | 'default'): void {
    this.themeService.setTheme(themeName);
  }
  setLayout(mode: 'leilavie' | 'public'): void {
    this.settingsService.setLayout(mode);
    this.setNavigationMode(this.settingsService.navigationMode());
  }
}
