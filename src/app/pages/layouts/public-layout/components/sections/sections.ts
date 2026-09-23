import { AfterViewInit, Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { SettingsService } from '../../../../../services/settings.service';
import { Home } from '../../../../home/home';
import { About } from '../../../../about/about';
import { ContactUs } from '../../../../contact-us/contact-us';
import { OurServices } from '../../../../our-services/our-services';
@Component({
  imports: [Home, About, ContactUs, OurServices],
  selector: 'app-sections',
  styleUrl: './sections.scss',
  templateUrl: './sections.html',
})
export class Sections implements AfterViewInit {
  private readonly settingsService = inject(SettingsService);
  private readonly elementRef = inject(ElementRef);
  ngAfterViewInit(): void {
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
