import {Component, Input} from '@angular/core';
import {StorageService} from '../../../../../../../@core/services/storage.service';

@Component({
  selector: 'app-header-dashboard',
  standalone: false,
  templateUrl: './header-dashboard.html',
  styleUrl: './header-dashboard.css'
})
export class HeaderDashboard {
  @Input() superAdmin: boolean

  constructor(public storageService: StorageService) {
  }
}
