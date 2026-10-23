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
import { leilavieMenuItems } from '../../../../../menu-items/menu-items';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SettingsService } from '../../../../../services/settings.service';
import { NgClass, NgTemplateOutlet } from '@angular/common';
@Component({
  imports: [RouterLink, RouterLinkActive, NgClass, NgTemplateOutlet],
  selector: 'app-leilavie-header',
  styleUrl: './leilavie-header.scss',
  templateUrl: './leilavie-header.html',
})
export class LeilavieHeader {
  private readonly settingsService = inject(SettingsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly headerRoot = viewChild<ElementRef<HTMLElement>>('headerRoot');
  readonly activeSection = this.settingsService.currentSection;
  readonly settingsRequested = output<void>();
  headerMenuItems: MenuItem[] = leilavieMenuItems;
  readonly leftMenuItems: MenuItem[] = this.headerMenuItems.slice(
    0,
    Math.ceil(this.headerMenuItems.length / 2),
  );
  readonly rightMenuItems: MenuItem[] = this.headerMenuItems.slice(
    Math.ceil(this.headerMenuItems.length / 2),
  );
  readonly navigationMode = this.settingsService.navigationMode;

  constructor() {
    afterNextRender(() => {
      const element = this.headerRoot()?.nativeElement;
      if (!element) {
        return;
      }

      const updateHeaderHeight = (): void => {
        document.documentElement.style.setProperty(
          '--app-header-height',
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
