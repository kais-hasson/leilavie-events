import { Component } from '@angular/core';
import { Icon } from '../../../@shared/components/icon/icon';
import { ScrollRevealDirective } from '../../../@shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [Icon, ScrollRevealDirective],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
})
export class ContactUs {}
