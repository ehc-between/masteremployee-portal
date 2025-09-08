import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService,
              private translate: TranslateService) { }

  showSuccess(TitleLocaleKey: string, messageLocaleKey: string) {
    this.toastr.success(this.translate.instant(TitleLocaleKey), this.translate.instant(messageLocaleKey));
  }

  success(title: string, message: string) {
    this.toastr.success(message, title);
  }

  error(title: string, message: string) {
    this.toastr.error(message, title);
  }
}
