import { Injectable } from '@angular/core';
import {EndpointService} from '../endpoints.service';
import {_MEE_INT_0, MEE_INT_0} from '../models/input.module';
import {StorageService} from '../../@core/services/storage.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Integration {

  constructor(private endpointService: EndpointService,
              private storageService: StorageService) {
  }

  setupRecmanIntegration(params: _MEE_INT_0) {
    let payload: MEE_INT_0 = {
      company_id: this.storageService.getSelectedCompanyId(),
      ...params
    }
    return this.endpointService.mee_int_0(payload).pipe(map((data => {
      return data.data;
    })))
  }

}
