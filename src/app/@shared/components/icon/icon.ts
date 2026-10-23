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
  readonly size = input<'sm' | 'md' | 'lg'>('lg');
  readonly iconUrl = computed(() => this.iconsService.getIconUrl(this.name(), this.source()));
  readonly sizeClass = computed(
    () => ({ sm: 'h-8 w-8', md: 'h-14 w-14', lg: 'h-25 w-25' })[this.size()],
  );
}
