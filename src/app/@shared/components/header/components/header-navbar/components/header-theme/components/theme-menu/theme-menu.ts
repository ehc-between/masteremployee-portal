import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-menu',
  standalone: false,
  templateUrl: './theme-menu.html',
  styleUrl: './theme-menu.css'
})
export class ThemeMenu {

  checkEvent(event: MouseEvent) {
    event.preventDefault();

    const target = event.target as HTMLElement;
    const link = target.closest('[data-kt-element="mode"]') as HTMLElement | null;
    if (!link) return;

    let themeMode = link.getAttribute('data-kt-value'); // "light" | "dark" | "system"

    if (!themeMode) return;

    // Save the raw selection for later
    document.documentElement.setAttribute('data-bs-theme-mode', themeMode);
    localStorage.setItem('data-bs-theme', themeMode);

    // Resolve system mode
    if (themeMode === 'system') {
      themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    document.documentElement.setAttribute('data-bs-theme', themeMode);
  }

}
