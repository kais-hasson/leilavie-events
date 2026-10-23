import { Component } from '@angular/core';
import { Icon } from '../../../@shared/components/icon/icon';
import { ScrollRevealDirective } from '../../../@shared/directives/scroll-reveal.directive';


@Component({
  selector: 'app-leilavie-contact-us',
  standalone: true,
  imports: [Icon, ScrollRevealDirective],
  templateUrl: './leilavie-contact-us.html',
  styleUrl: './leilavie-contact-us.scss',
})
export class LeilavieContactUs {}
