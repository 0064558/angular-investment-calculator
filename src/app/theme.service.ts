import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _isDark = signal(true);
  private readonly isBrowser: boolean;

  readonly isDark = this._isDark.asReadonly();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const savedTheme = localStorage.getItem('investment-calculator-theme');
      this._isDark.set(savedTheme !== 'light');
      this.applyTheme();
    }
  }

  toggle(): void {
    this._isDark.update((isDark) => !isDark);
    this.applyTheme();

    if (this.isBrowser) {
      localStorage.setItem(
        'investment-calculator-theme',
        this._isDark() ? 'dark' : 'light',
      );
    }
  }

  private applyTheme(): void {
    this.document.body.classList.toggle('light-theme', !this._isDark());
  }
}
