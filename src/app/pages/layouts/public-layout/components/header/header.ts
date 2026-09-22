import { Component, inject, output } from '@angular/core';
import { MenuItem } from '../../../../../menu-items/menu-item';
import { menuItems } from '../../../../../menu-items/menu-items';
import { RouterLink } from '@angular/router';
import { SettingsService } from '../../../../../services/settings.service';
@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  private readonly settingsService = inject(SettingsService);
  readonly settingsRequested = output<void>();
  headerMenuItems: MenuItem[] = menuItems;
  readonly navigationMode = this.settingsService.navigationMode;
  openSettings(): void {
    this.settingsRequested.emit();
  }
}
