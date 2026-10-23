import { Component, inject, viewChild } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { PublicLayout } from './public-layout/public-layout';
import { LeilavieLayout } from './leilavie-layout/leilavie-layout';

@Component({
  imports: [ LeilavieLayout, PublicLayout],
  selector: 'app-layout',
  styleUrl: './layout.scss',
  templateUrl: './layout.html',
})
export class Layout {
  private readonly settingsService = inject(SettingsService);
  readonly layout = this.settingsService.layout;
}
