import { Component, computed, inject, input } from '@angular/core';
import { IconsService, IconSource } from '../../../services/icons.service';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-icon',
  styleUrl: './icon.scss',
  templateUrl: './icon.html',
})
export class Icon {
  private readonly iconsService = inject(IconsService);

  readonly name = input.required<string>();
  readonly source = input<IconSource>('logos');
  readonly iconUrl = computed(() => this.iconsService.getIconUrl(this.name(), this.source()));
}
