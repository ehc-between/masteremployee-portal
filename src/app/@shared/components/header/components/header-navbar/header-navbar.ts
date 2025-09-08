import {Component, Input} from '@angular/core';
import {UserResponse} from '../../../../models/response.module';
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

  constructor(public storageService: StorageService) {
  }


  protected readonly onImageError = onImageError;
}
