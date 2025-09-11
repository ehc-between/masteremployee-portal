import { Component } from '@angular/core';
import {StorageService} from '../../../../../@core/services/storage.service';

@Component({
  selector: 'app-sidebar-menu',
  standalone: false,
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.css'
})
export class SidebarMenu {

  constructor(public storageService: StorageService) {
  }
}
