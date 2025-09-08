import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from '../../../../../../../@core/services/storage.service';

@Component({
  selector: 'app-header-language',
  standalone: false,
  templateUrl: './header-language.html',
  styleUrl: './header-language.css'
})
export class HeaderLanguage {
  currentLang = 'en';

  constructor(private translate: TranslateService,
              private storageService: StorageService) {
    // set default
    translate.setDefaultLang('en');
    this.currentLang = translate.getCurrentLang() || 'en';
    this.currentLang = this.storageService.get('currentLang') || 'en'
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.storageService.set("currentLang", lang);
    this.currentLang = lang;
  }

}
