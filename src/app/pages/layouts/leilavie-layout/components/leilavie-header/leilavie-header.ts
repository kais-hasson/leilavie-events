import { Component, inject, output, signal } from '@angular/core';
import { MenuItem } from '../../../../../menu-items/menu-item';
import { leilavieMenuItems } from '../../../../../menu-items/menu-items';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SettingsService } from '../../../../../services/settings.service';
import { NgClass } from '@angular/common';
@Component({
  imports: [RouterLink, RouterLinkActive, NgClass],
  selector: 'app-leilavie-header',
  styleUrl: './leilavie-header.scss',
  templateUrl: './leilavie-header.html',
})
export class LeilavieHeader {
  private readonly settingsService = inject(SettingsService);
  readonly activeSection = this.settingsService.currentSection;
  readonly settingsRequested = output<void>();
  headerMenuItems: MenuItem[] = leilavieMenuItems;
  readonly navigationMode = this.settingsService.navigationMode;
  openSettings(): void {
    this.settingsRequested.emit();
  }
  setActiveSection(sectionId: string | undefined): void {
    if (sectionId) {
      this.settingsService.setCurrentSection(sectionId);
    }
  }
}
