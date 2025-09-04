// src/main.ts

// Just bootstrap Angular. Do NOT import Keen bundles here.
// Zone.js is already injected via angular.json → scripts

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app-module';

platformBrowserDynamic()
  .bootstrapModule(AppModule, { ngZoneEventCoalescing: true })
  .catch(err => console.error(err));
