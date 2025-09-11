import {Component, Input} from '@angular/core';
import {CompanyResponse, UserResponse} from '../../../../models/response.module';
import {onImageError} from "../../../../../@core/utils/utils.service";
import {StorageService} from '../../../../../@core/services/storage.service';

@Component({
  selector: 'app-header-navbar',
  standalone: false,
  templateUrl: './header-navbar.html',
  styleUrl: './header-navbar.css'
})
export class HeaderNavbar {
  @Input() user: UserResponse
  @Input() companies: CompanyResponse[]

  constructor(public storageService: StorageService) {
  }


  protected readonly onImageError = onImageError;
}
