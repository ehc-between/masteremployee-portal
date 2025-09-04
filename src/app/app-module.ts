import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
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
    HeaderSearch
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
