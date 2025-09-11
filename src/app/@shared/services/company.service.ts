import {Injectable} from "@angular/core";
import {EndpointService} from "../endpoints.service";
import {
  _COR_COY_0,
  _COR_COY_2,
  COR_COY_0,
  COR_COY_1,
  COR_COY_4,


} from "../models/input.module";
import {StorageService} from "../../@core/services/storage.service";
import {distinctUntilChanged, map} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CompanyService {

  constructor(private endpointService: EndpointService,
              private storageService: StorageService) {
  }


  getCompany(params: _COR_COY_0) {
    let payload = {
      company_id: this.storageService.getSelectedCompanyId()
    }
    return this.endpointService.cor_coy_0(payload).pipe(map((data => {
      return data.data;
    })))
  }
  getCompanyById(params: COR_COY_0) {
    return this.endpointService.cor_coy_0(params).pipe(map((data => {
      return data.data;
    })))
  }

  createCompany(params: COR_COY_1) {
    return this.endpointService.cor_coy_1(params).pipe(map((data => {
      return data.data;
    })))
  }

  editCompany(params: _COR_COY_2) {
    let payload = {
      company_id: this.storageService.getSelectedCompanyId(),
      ...params
    }
    return this.endpointService.cor_coy_2(payload).pipe(map((data => {
      return data.data;
    })))
  }

  getCompanyEmployees(company_id?: string) {
    let payload = {
      company_id: company_id ? company_id : this.storageService.getSelectedCompanyId(),
    }
    return this.endpointService.cor_coy_3(payload).pipe(map((data => {
      return data.data;
    })))
  }

  getAllCompanies(params: COR_COY_4) {
    return this.endpointService.cor_coy_4(params).pipe(map((data => {
      return data;
    })))
  }
}
