import { AfterViewInit, Component, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { SettingsService } from '../../../../../services/settings.service';
import { isPlatformBrowser } from '@angular/common';
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

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const sections = this.elementRef.nativeElement.querySelectorAll('section');

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          this.settingsService.setCurrentSection(visibleSection.target.id);

          console.log('Current section:', visibleSection.target.id);
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section: Element) => {
      observer.observe(section);
    });
  }
}
