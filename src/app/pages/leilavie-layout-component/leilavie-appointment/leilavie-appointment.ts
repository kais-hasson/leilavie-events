import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../@shared/directives/scroll-reveal.directive';

@Component({
  imports: [RouterLink, ScrollRevealDirective],
  selector: 'app-leilavie-appointment',
  styleUrl: './leilavie-appointment.scss',
  templateUrl: './leilavie-appointment.html',
})
export class LeilavieAppointment {
  readonly eyebrow = signal('Book With Us');
  readonly heading = signal(['Let\'s Plan Your', 'Next Celebration']);
  readonly description = signal(
    'Tell us about your event and we\'ll reach out to schedule a consultation — flowers, grazing tables, decor and more, tailored to your sweetest moments.',
  );
}
