import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { ScrollRevealDirective } from '../../../../../@shared/directives/scroll-reveal.directive';

@Component({
  imports: [ScrollRevealDirective],
  selector: 'app-leilavie-footer',
  styleUrl: './leilavie-footer.scss',
  templateUrl: './leilavie-footer.html',
})
export class LeilavieFooter {
  private readonly destroyRef = inject(DestroyRef);
  private readonly footerRoot = viewChild<ElementRef<HTMLElement>>('footerRoot');

  constructor() {
    afterNextRender(() => {
      const element = this.footerRoot()?.nativeElement;
      if (!element) {
        return;
      }

      const updateFooterHeight = (): void => {
        document.documentElement.style.setProperty(
          '--app-footer-height',
          `${element.offsetHeight}px`,
        );
      };

      updateFooterHeight();
      const resizeObserver = new ResizeObserver(updateFooterHeight);
      resizeObserver.observe(element);
      this.destroyRef.onDestroy(() => resizeObserver.disconnect());
    });
  }
}
