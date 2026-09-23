import { Injectable } from '@angular/core';
export type IconSource = 'icons' | 'logos';
@Injectable({ providedIn: 'root' })
export class IconsService {
  /**
   * Constructor
   */

  private readonly assetsPath = 'assets';

  getIconUrl(name: string, source: IconSource = 'icons'): string {
    return `${this.assetsPath}/${source}/${name}.svg`;
  }
}
