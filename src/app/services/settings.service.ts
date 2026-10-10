import { Injectable, signal } from '@angular/core';

export type NavigationMode = 'single-page' | 'pages';
export type layout = 'leilavie' | 'public';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  readonly navigationMode = signal<NavigationMode>('single-page');
  readonly currentSection = signal<string>('home');
  readonly layout = signal<string>('leilavie');


  setNavigationMode(mode: NavigationMode): void {
    this.navigationMode.set(mode);
  }
  setCurrentSection(sectionId: string): void {
    this.currentSection.set(sectionId);
  }
   setLayout(id: string): void {
    this.layout.set(id);
  }
}