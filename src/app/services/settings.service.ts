import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type NavigationMode = 'single-page' | 'pages';
export type layout = 'leilavie' | 'public';

const NAVIGATION_MODE_STORAGE_KEY = 'leilavie-navigation-mode';
const LAYOUT_STORAGE_KEY = 'leilavie-layout';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly navigationMode = signal<NavigationMode>(
    this.readStored(NAVIGATION_MODE_STORAGE_KEY, ['single-page', 'pages'], 'single-page'),
  );
  readonly currentSection = signal<string>('home');
  readonly layout = signal<string>(
    this.readStored(LAYOUT_STORAGE_KEY, ['leilavie', 'public'], 'leilavie'),
  );

  setNavigationMode(mode: NavigationMode): void {
    this.navigationMode.set(mode);
    this.storeValue(NAVIGATION_MODE_STORAGE_KEY, mode);
  }
  setCurrentSection(sectionId: string): void {
    this.currentSection.set(sectionId);
  }
  setLayout(id: string): void {
    this.layout.set(id);
    this.storeValue(LAYOUT_STORAGE_KEY, id);
  }

  private readStored<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
    if (!this.isBrowser) {
      return fallback;
    }

    try {
      const stored = localStorage.getItem(key);
      if (stored && (allowed as readonly string[]).includes(stored)) {
        return stored as T;
      }
    } catch {
      /* localStorage unavailable (e.g. private mode) */
    }

    return fallback;
  }

  private storeValue(key: string, value: string): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.setItem(key, value);
    } catch {
      /* localStorage unavailable (e.g. private mode) */
    }
  }
}