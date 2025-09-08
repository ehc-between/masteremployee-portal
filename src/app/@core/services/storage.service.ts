import { Injectable } from '@angular/core';
import {EndpointService} from "../../@shared/endpoints.service";
import {UserEntityRelationWithoutUserDataResponse} from "../../@shared/models/response.module";


const USER_KEY = 'auth-user';
const COMPANY_KEY = 'selected-company';
const ORDER = "order"

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // source = window.sessionStorage;
  source = window.localStorage;
  html: Element;

  constructor(private endpointService: EndpointService) {
    this.html = document.getElementsByTagName('html')[0]
  }

  public getUser(): any {
    const user = this.source.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const user = this.source.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

  public saveSelectedCompany(company: UserEntityRelationWithoutUserDataResponse): void {
    this.source.removeItem(COMPANY_KEY);
    this.source.setItem(COMPANY_KEY, JSON.stringify(company));
  }

  public getSelectedCompany(): any {
    const company = this.source.getItem(COMPANY_KEY);

    if (company) {
      return JSON.parse(company);
    }
    return {};
  }

  public getSelectedCompanyId(silent = false): string {
    const company = this.source.getItem(COMPANY_KEY);
    if (company) {
      return JSON.parse(company).entity_id;
    } else {
      if (!silent) {
        // this.toastService.errorToast('missing_company_id')
      }
      throw new Error('No company selected - getSelectedCompanyId()');
    }
  }

  clean(): void {
    this.source.clear();
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  // Get data from local storage
  get(key: string): string | null {
    return localStorage.getItem(key);
  }
}
