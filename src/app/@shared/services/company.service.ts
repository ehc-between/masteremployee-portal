import {Injectable} from "@angular/core";
import {EndpointService} from "../endpoints.service";
import {
  _COR_COY_0,
  _COR_COY_2,
  _COR_COY_5,
  _COR_COY_6,
  _COR_COY_7, _COR_COY_8,
  _COR_TMP_1,
  _COR_TMP_2,
  _COR_TMP_4,
  _COR_TMP_5,
  _COR_TMP_8,
  _COR_TMP_9,
  COR_COY_0,
  COR_COY_1,
  COR_COY_3,
  COR_COY_4,
  COR_COY_5,
  COR_COY_6,
  COR_COY_7, COR_COY_8,
  COR_SER_1,
  COR_TMP_0,
  COR_TMP_1,
  COR_TMP_2,
  COR_TMP_4,
  COR_TMP_5,
  COR_TMP_6,
  COR_TMP_7,
  COR_TMP_8,
  COR_TMP_9
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

  getMessagesStats(params: COR_SER_1) {
    return this.endpointService.cor_ser_1(params).pipe(map((data => {
      return data.data;
    })))
  }

  getTokenStats() {
    return this.endpointService.cor_ser_2().pipe(map((data => {
      return data.data;
    })))
  }

  getCompanyWordBank(params: _COR_COY_5){
    let payload: COR_COY_5 = {
      company_id: this.storageService.getSelectedCompanyId(),
      ...params
    }
    return this.endpointService.cor_coy_5(payload).pipe(map((data => {
      return data.data;
    })))
  }

  addWordToCompanyWordBank(params: _COR_COY_6){
    let payload: COR_COY_6 = {
      company_id: this.storageService.getSelectedCompanyId(),
      ...params
    }
    return this.endpointService.cor_coy_6(payload).pipe(map((data => {
      return data.data;
    })))
  }

  editWordInCompanyWordBank(params: _COR_COY_7){
    let payload: COR_COY_7 = {
      company_id: this.storageService.getSelectedCompanyId(),
      ...params
    }
    return this.endpointService.cor_coy_7(payload).pipe(map((data => {
      return data.data;
    })))
  }

  deleteWordFromCompanyWordBank(params: _COR_COY_8){
    let payload: COR_COY_8 = {
      company_id: this.storageService.getSelectedCompanyId(),
      ...params
    }
    return this.endpointService.cor_coy_8(payload).pipe(map((data => {
      return data.data;
    })))
  }
}
