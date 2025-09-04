import {AfterViewInit, Component, inject, signal} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements AfterViewInit{
  protected readonly title = signal('masteremployee-portal');

  private router = inject(Router);

  private keenInit() {
    const w = window as any;

    // Global app/layout
    w.KTApp?.init?.();
    w.KTLayout?.init?.();

    // Create instances for data-kt-* components used in your header
    w.KTMenu?.init?.();
    w.KTDrawer?.init?.();
    w.KTScroll?.init?.();
    w.KTSticky?.init?.();
    w.KTToggle?.init?.();     // generic toggles (if present)
  }

  ngAfterViewInit() {
    this.keenInit(); // first paint
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => setTimeout(() => this.keenInit()));
  }
}
