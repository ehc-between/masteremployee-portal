import {CUSTOM_ELEMENTS_SCHEMA, NgModule, provideBrowserGlobalErrorListeners, isDevMode} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './@shared/components/header/header';
import { Footer } from './@shared/components/footer/footer';
import { Sidebar } from './@shared/components/sidebar/sidebar';
import { Toolbar } from './@shared/components/toolbar/toolbar';
import { Content } from './@shared/components/content/content';
import { HeaderMenu } from './@shared/components/header/components/header-menu/header-menu';
import { HeaderNavbar } from './@shared/components/header/components/header-navbar/header-navbar';
import { SidebarLogo } from './@shared/components/sidebar/components/sidebar-logo/sidebar-logo';
import { SidebarMenu } from './@shared/components/sidebar/components/sidebar-menu/sidebar-menu';
import { SidebarFooter } from './@shared/components/sidebar/components/sidebar-footer/sidebar-footer';
import { HeaderDashboard } from './@shared/components/header/components/header-menu/components/header-dashboard/header-dashboard';
import { HeaderPages } from './@shared/components/header/components/header-menu/components/header-pages/header-pages';
import { HeaderSearch } from './@shared/components/header/components/header-navbar/components/header-search/header-search';
import { HeaderNotification } from './@shared/components/header/components/header-navbar/components/header-notification/header-notification';
import { HeaderLanguage } from './@shared/components/header/components/header-navbar/components/header-language/header-language';
import { HeaderTheme } from './@shared/components/header/components/header-navbar/components/header-theme/header-theme';
import { ThemeMenu } from './@shared/components/header/components/header-navbar/components/header-theme/components/theme-menu/theme-menu';
import { HeaderUserMenu } from './@shared/components/header/components/header-navbar/components/header-user-menu/header-user-menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {provideTranslateService, TranslateLoader, TranslateModule, TranslatePipe} from '@ngx-translate/core';
import {provideTranslateHttpLoader, TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import {LoginComponent} from './pages/auth/login/login.component';
import { Recruiter } from './pages/dashboards/recruiter/recruiter';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader();
}

@NgModule({
  declarations: [
    App,
    Header,
    Footer,
    Sidebar,
    Toolbar,
    Content,
    HeaderMenu,
    HeaderNavbar,
    SidebarLogo,
    SidebarMenu,
    SidebarFooter,
    HeaderDashboard,
    HeaderPages,
    HeaderSearch,
    HeaderNotification,
    HeaderLanguage,
    HeaderTheme,
    ThemeMenu,
    HeaderUserMenu,
    Recruiter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    TranslatePipe,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    })
  ],
  bootstrap: [App],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
