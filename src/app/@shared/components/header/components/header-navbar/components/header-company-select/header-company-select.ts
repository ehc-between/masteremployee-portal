import {Component, Input} from '@angular/core';
import {CompanyResponse, UserEntityRelationWithoutUserDataResponse} from '../../../../../../models/response.module';
import {StorageService} from '../../../../../../../@core/services/storage.service';
import {ToastService} from '../../../../../../../@core/services/toast.service';

@Component({
  selector: 'app-header-company-select',
  standalone: false,
  templateUrl: './header-company-select.html',
  styleUrl: './header-company-select.css'
})
export class HeaderCompanySelect {
  @Input() companies: CompanyResponse[]
  currentCompany: UserEntityRelationWithoutUserDataResponse

  constructor(private storageService: StorageService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.currentCompany = this.storageService.getSelectedCompany()
    console.log("Current Company: ", this.currentCompany)
  }

  switchCompany(company: CompanyResponse) {
    const companyId = company.company_id;
    const payload: UserEntityRelationWithoutUserDataResponse = {
      entity_id: company!.company_id,
      entity_name: company!.company_name,
      role_id: 1,
      role_name: 'Admin',
      created_at: company!.created_at,
      updated_at: company!.updated_at,
      deleted_at: company!.deleted_at,
    }
    this.storageService.saveSelectedCompany(payload);
    console.log("display toast")
    // this.toastService.success("Success", 'test');
    window.location.reload();
  }

  checkSelectedCompany(company: CompanyResponse) {
    return this.currentCompany.entity_id === company.company_id;
  }
}
