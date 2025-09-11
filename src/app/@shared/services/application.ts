import { Injectable } from '@angular/core';
import {EndpointService} from '../endpoints.service';
import {StorageService} from '../../@core/services/storage.service';
import {
  _MEE_APP_0,
  _MEE_APP_1,
  _MEE_APP_2, _MEE_APP_3,
  _MEE_INT_0,
  MEE_APP_0,
  MEE_APP_1,
  MEE_APP_2, MEE_APP_3, MEE_APP_4,
  MEE_INT_0
} from '../models/input.module';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Application {


  constructor(private endpointService: EndpointService,
              private storageService: StorageService) {
  }

  getAvailableApplications(params: _MEE_APP_0) {
    let payload: MEE_APP_0 = {
      company_id: this.storageService.getSelectedCompanyId(),
      ...params
    }
    return this.endpointService.mee_app_0(payload).pipe(map((data => {
      return data.data;
    })))
  }

  getEnabledCompanyApplications(params: _MEE_APP_2) {
    let payload: MEE_APP_2 = {
      company_id: this.storageService.getSelectedCompanyId(),
      ...params
    }
    return this.endpointService.mee_app_2(payload).pipe(map((data => {
      return data.data;
    })))
  }

  enableCompanyApplication(params: _MEE_APP_1) {
    let payload: MEE_APP_1 = {
      company_id: this.storageService.getSelectedCompanyId(),
      ...params
    }
    return this.endpointService.mee_app_1(payload).pipe(map((data => {
      return data;
    })))
  }

  disableCompanyApplication(params: _MEE_APP_3) {
    let payload: MEE_APP_3 = {
      company_id: this.storageService.getSelectedCompanyId(),
      ...params
    }
    return this.endpointService.mee_app_3(payload).pipe(map((data => {
      return data;
    })))
  }

  getApplicationTypes(params: MEE_APP_4) {
    return this.endpointService.mee_app_4(params).pipe(map((data => {
      return data.data;
    })))
  }
}
