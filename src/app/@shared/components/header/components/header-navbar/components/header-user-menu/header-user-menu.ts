import {Component, Input} from '@angular/core';
import {UserResponse} from '../../../../../../models/response.module';

@Component({
  selector: 'app-header-user-menu',
  standalone: false,
  templateUrl: './header-user-menu.html',
  styleUrl: './header-user-menu.css'
})
export class HeaderUserMenu {
  @Input() user: UserResponse
}
