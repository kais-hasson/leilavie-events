import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { SettingsService } from '../../../../../services/settings.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LeilavieAbout } from '../../../../leilavie-layout-component/leilavie-about/leilavie-about';
import { LeilavieContactUs } from '../../../../leilavie-layout-component/leilavie-contact-us/leilavie-contact-us';
import { LeilavieOurServices } from '../../../../leilavie-layout-component/leilavie-our-services/leilavie-our-services';
import { LeilavieHome } from '../../../../leilavie-layout-component/leilavie-home/leilavie-home';
@Component({
  imports: [LeilavieAbout, LeilavieContactUs, LeilavieOurServices, LeilavieHome],
  selector: 'app-leilavie-sections',
  styleUrl: './leilavie-sections.scss',
  templateUrl: './leilavie-sections.html',
})
export class LeilavieSections implements AfterViewInit {
  private readonly settingsService = inject(SettingsService);
  private readonly elementRef = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const sections: Element[] = Array.from(
      this.elementRef.nativeElement.querySelectorAll('section'),
    );
    const ratios = new Map<Element, number>();
    let lastSectionId: string | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestSection: Element | null = null;
        let bestRatio = 0;
        for (const section of sections) {
          const ratio = ratios.get(section) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestSection = section;
          }
        }

        if (bestSection && bestSection.id !== lastSectionId) {
          lastSectionId = bestSection.id;
          this.settingsService.setCurrentSection(bestSection.id);
          this.router.navigate([], {
            fragment: bestSection.id,
            replaceUrl: true,
          });
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
