import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  output,
  viewChild,
} from '@angular/core';
import { MenuItem } from '../../../../../menu-items/menu-item';
import { menuItems } from '../../../../../menu-items/menu-items';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SettingsService } from '../../../../../services/settings.service';
import { NgClass } from '@angular/common';
@Component({
  imports: [RouterLink, RouterLinkActive, NgClass],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  private readonly settingsService = inject(SettingsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly headerRoot = viewChild<ElementRef<HTMLElement>>('headerRoot');
  readonly activeSection = this.settingsService.currentSection;
  readonly settingsRequested = output<void>();
  headerMenuItems: MenuItem[] = menuItems;
  readonly navigationMode = this.settingsService.navigationMode;

  constructor() {
    afterNextRender(() => {
      const element = this.headerRoot()?.nativeElement;
      if (!element) {
        return;
      }

      const updateHeaderHeight = (): void => {
        document.documentElement.style.setProperty(
          '--app-public-header-height',
          `${element.offsetHeight}px`,
        );
      };

      updateHeaderHeight();
      const resizeObserver = new ResizeObserver(updateHeaderHeight);
      resizeObserver.observe(element);
      this.destroyRef.onDestroy(() => resizeObserver.disconnect());
    });
  }

  openSettings(): void {
    this.settingsRequested.emit();
  }
  setActiveSection(sectionId: string | undefined): void {
    if (sectionId) {
      this.settingsService.setCurrentSection(sectionId);
    }
  }
}
