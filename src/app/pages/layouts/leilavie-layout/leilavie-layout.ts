import { Component, inject, viewChild } from '@angular/core';
import { LeilavieHeader } from './components/leilavie-header/leilavie-header';
import { LeilavieFooter } from './components/leilavie-footer/leilavie-footer';
import { RouterOutlet } from '@angular/router';
import { LeilavieSections } from './components/leilavie-sections/leilavie-sections';
import { SettingsService } from '../../../services/settings.service';
import { Settings } from '../settings/settings';

@Component({
  imports: [LeilavieHeader, LeilavieFooter, RouterOutlet, Settings, LeilavieSections],
  selector: 'app-leilavie-layout',
  styleUrl: './leilavie-layout.scss',
  templateUrl: './leilavie-layout.html',
})
export class LeilavieLayout {
  private readonly settingsService = inject(SettingsService);
  readonly settings = viewChild.required(Settings);
  readonly navigationMode = this.settingsService.navigationMode;
  openSettings(): void {
    this.settings().open();
  }
}
