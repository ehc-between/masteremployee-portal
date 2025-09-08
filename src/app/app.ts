import {AfterViewInit, ApplicationRef, Component, inject, signal} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {concat, filter, first, interval} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {SwUpdate} from '@angular/service-worker';
import {AuthService} from './@core/services/auth.service';

declare global {
  interface Window { _chatlio?: any & { page?: () => void }; }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements AfterViewInit{
  protected readonly title = signal('masteremployee-portal');
  private translate = inject(TranslateService);
  isLoggedIn: boolean = false
  currentPath = '';

  constructor(private swUpdate: SwUpdate,
              private appRef: ApplicationRef,
              private authService: AuthService) {
    this.translate.addLangs(['en', 'no'])
    this.translate.setFallbackLang('en')
    this.translate.use('en')
    this.authService.init();
    this.authService.isAuthenticated.subscribe((data) => {
      console.log("isAuthenticated", data)
      this.isLoggedIn = data
    })
  }

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

  ngOnInit(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        window._chatlio?.page?.()
        window._chatlio?.set?.('zIndex', 2147483000); // in case it’s hidden under overlays
      });

    if (environment.production) {
      this.checkUpdates()
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentPath = event.url;
    });
  }

  checkUpdates() {
    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable));
    const everySixHours$ = interval(10 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await this.swUpdate.checkForUpdate();
        if (updateFound) {
          if (confirm(this.translate.instant("applicationUpdateMessage"))) {
            document.location.reload();
          }
        } else {
        }
      } catch (err) {
      }
    });
  }

}
