import { Injectable, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { themes, Theme, Palette } from '../config/themes';

const THEME_STORAGE_KEY = 'leilavie-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly initialThemeName = this.readStoredThemeName();
  private readonly currentTheme = signal<Theme>(themes[this.initialThemeName]);
  private readonly currentThemeName = signal<keyof typeof themes>(this.initialThemeName);
  readonly theme = this.currentTheme.asReadonly();
  readonly themeName = this.currentThemeName.asReadonly();
  constructor() {
    this.applyTheme(this.currentTheme());
  }
  setTheme(themeName: keyof typeof themes): void {
    const selectedTheme = themes[themeName];

    if (!selectedTheme) {
      return;
    }

    this.currentTheme.set(selectedTheme);
    this.currentThemeName.set(themeName);
    this.applyTheme(selectedTheme);
    this.storeThemeName(themeName);
  }

  private readStoredThemeName(): keyof typeof themes {
    if (!this.isBrowser) {
      return 'default';
    }

    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored && stored in themes) {
        return stored as keyof typeof themes;
      }
    } catch {
      /* localStorage unavailable (e.g. private mode) */
    }

    return 'default';
  }

  private storeThemeName(themeName: keyof typeof themes): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeName);
    } catch {
      /* localStorage unavailable (e.g. private mode) */
    }
  }

  private applyTheme(theme: Theme): void {
    const root = this.document.documentElement;

    this.applyPalette(root, 'primary', theme.primary);
    this.applyPalette(root, 'secondary', theme.secondary);

    root.style.setProperty('--app-background', theme.background);
    root.style.setProperty('--app-background-image', theme.backgroundImage);
    root.style.setProperty('--app-text', theme.text);
    root.style.setProperty('--app-button-text-color', theme.buttonTextColor);
    root.style.setProperty('--app-font-family', theme.fontFamily);
    root.style.setProperty('--app-font-family-header', theme.fontFamilyHeader);
    root.style.setProperty('--app-font-family-secondary', theme.fontFamilySecondary);
    root.style.setProperty('--app-font-size', theme.fontSize);
    root.style.setProperty('--app-header-font-size', theme.headerFontSize);
  }

  private applyPalette(root: HTMLElement, name: string, palette: Palette): void {
    Object.entries(palette).forEach(([shade, value]) => {
      root.style.setProperty(`--app-${name}-${shade}`, value);
    });
  }
}
