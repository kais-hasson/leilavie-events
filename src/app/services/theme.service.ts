import { Injectable, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { themes, Theme, Palette } from '../config/themes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly currentTheme = signal<Theme>(themes['default']);
  private readonly document = inject(DOCUMENT);
  readonly theme = this.currentTheme.asReadonly();
  constructor() {
    this.applyTheme(this.currentTheme());
  }
  setTheme(themeName: keyof typeof themes): void {
    const selectedTheme = themes[themeName];

    if (!selectedTheme) {
      return;
    }

    this.currentTheme.set(selectedTheme);
    this.applyTheme(selectedTheme);
  }

  private applyTheme(theme: Theme): void {
    const root = this.document.documentElement;

    this.applyPalette(root, 'primary', theme.primary);
    this.applyPalette(root, 'secondary', theme.secondary);

    root.style.setProperty('--app-background', theme.background);
    root.style.setProperty('--app-text', theme.text);
  }

  private applyPalette(root: HTMLElement, name: string, palette: Palette): void {
    Object.entries(palette).forEach(([shade, value]) => {
      root.style.setProperty(`--app-${name}-${shade}`, value);
    });
  }
}
