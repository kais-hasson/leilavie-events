import { Injectable, signal } from '@angular/core';

export type NavigationMode = 'single-page' | 'pages';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  readonly navigationMode = signal<NavigationMode>('single-page');

  setNavigationMode(mode: NavigationMode): void {
    this.navigationMode.set(mode);
  }
}
