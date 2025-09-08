import { Component } from '@angular/core';
import {
  CompanyResponse,
  UserAssistantGroupFavoriteResponse,
  UserEntityRelationWithoutUserDataResponse,
  UserResponse
} from '../../models/response.module';
import {UserService} from '../../../@core/services/user.service';
import {StorageService} from '../../../@core/services/storage.service';
import {AuthService} from '../../../@core/services/auth.service';
import {Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import {getInitials} from '../../../@core/utils/utils.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {COR_COY_4} from '../../models/input.module';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  user: UserEntityRelationWithoutUserDataResponse;
  superAdmin: boolean = false;
  userObj: UserResponse;
  initialsKeys: string[];
  initials: string;
  companies: CompanyResponse[]
  userFavorites: UserAssistantGroupFavoriteResponse[]
  form: FormGroup;
  isDisabled: boolean = false;
  hoverClass: string = '';

  constructor(private userService: UserService,
              private storageService: StorageService,
              private authService: AuthService,
              private router: Router,
              private companyService: CompanyService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe((data) => {
      this.userObj = data.data;
      if (!this.userObj.profile_image_url) {
        this.initialsKeys = [this.userObj.first_name, this.userObj.last_name];
        this.initials = getInitials(this.initialsKeys)
      }
      console.log(this.userObj.profile_image_url)
    });
    // this.getUserFavorites()
    setTimeout(() => {
      this.userService.getUserEntityRelation().subscribe((data) => {
        this.user = data.find((relation) => relation.entity_id == this.storageService.getSelectedCompanyId())!;
        // this.userService.userFavorites$.subscribe((res) => {
        //   this.userFavorites = res!
        // })
      });
    }, 1000);
    let token = this.authService.getToken()
    for (const key in token.role_access) {
      if (token.role_access[key].includes('BWN-0')) {
        this.superAdmin = true;
        this.getAllCompanies()
        console.log('Super Admin');
        break;
      }
    }

    if(this.superAdmin) {
      this.form = new FormGroup({
        selectedCompanyId: new FormControl('', [Validators.required])
      })
      setTimeout(() => {
        this.form.patchValue({
          selectedCompanyId: this.storageService.getSelectedCompanyId()
        })
        if (this.router.url.includes('*/super-admin/company-administration*')) {
          this.isDisabled = true;
        }
      }, 1000);
    }
  }

  // getUserFavorites() {
  //   this.userService.getAssistantGroupFavorites().subscribe((res) => {
  //     this.userService.userFavoritesSubject.next(res)
  //   })
  // }

  goToAssistantDetails(favorite: UserAssistantGroupFavoriteResponse) {
    this.router.navigate([`/assistants/details/${favorite.assistant_group.assistant_group_id}`]);
  }

  getAllCompanies() {
    let payload: COR_COY_4 = {
      paginate: 0,
    }

    this.companyService.getAllCompanies(payload).subscribe((data) => {
      this.companies = data.data;
      console.log("Companies: ", this.companies)
    })
  }

  onGroupChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const companyId = target.value;
    const selectedCompany = this.companies.find(company => company.company_id == companyId);
    const payload: UserEntityRelationWithoutUserDataResponse = {
      entity_id: selectedCompany!.company_id,
      entity_name: selectedCompany!.company_name,
      role_id: 1,
      role_name: 'Admin',
      created_at: selectedCompany!.created_at,
      updated_at: selectedCompany!.updated_at,
      deleted_at: selectedCompany!.deleted_at,
    }
    this.storageService.saveSelectedCompany(payload);
    window.location.reload();
    // this.createThreadForm.get('assistant_id')!.setValue(this.filteredAssistants.find((assistant) => assistant.assistant_model_id = this.userOptions.preferred_assistant_type_id)?.assistant_id); // Reset the assistant dropdown
  }

  signOut() {
    this.authService.logout();
  }

  isActive(route: string): boolean {
    return this.hoverClass === route || this.router.url === route;
  }
}
