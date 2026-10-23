import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../@shared/directives/scroll-reveal.directive';

@Component({
  imports: [ScrollRevealDirective],
  selector: 'app-appointment',
  styleUrl: './appointment.scss',
  templateUrl: './appointment.html',
})
export class Appointment {}
