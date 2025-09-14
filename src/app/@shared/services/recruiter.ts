import { Injectable } from '@angular/core';
import {EndpointService} from '../endpoints.service';
import {StorageService} from '../../@core/services/storage.service';
import {_MEE_REC_0, _MEE_REC_1, MEE_REC_0, MEE_REC_1} from '../models/input.module';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {

  constructor(private endpointService: EndpointService,
              private storageService: StorageService) {
  }


  getCandidateList(params: _MEE_REC_0) {
    let payload: MEE_REC_0 = {
      company_id: this.storageService.getSelectedCompanyId(),
      ...params
    }
    return this.endpointService.mee_rec_0(payload).pipe(map((data => {
      return data;
    })))
  }

  getCandidateDetails(params: _MEE_REC_1) {
    let payload: MEE_REC_1 = {
      company_id: this.storageService.getSelectedCompanyId(),
      ...params
    }
    return this.endpointService.mee_rec_1(payload).pipe(map((data => {
      return data.data;
    })))
  }
}
