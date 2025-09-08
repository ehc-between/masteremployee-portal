import {Component, Input} from '@angular/core';
import {UserResponse} from '../../../../models/response.module';

@Component({
  selector: 'app-header-navbar',
  standalone: false,
  templateUrl: './header-navbar.html',
  styleUrl: './header-navbar.css'
})
export class HeaderNavbar {
  @Input() user: UserResponse
}
