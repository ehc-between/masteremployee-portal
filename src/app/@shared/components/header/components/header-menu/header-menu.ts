import {Component, Input} from '@angular/core';
import {UserResponse} from '../../../../models/response.module';

@Component({
  selector: 'app-header-menu',
  standalone: false,
  templateUrl: './header-menu.html',
  styleUrl: './header-menu.css'
})
export class HeaderMenu {
  @Input() user: UserResponse
  @Input() superAdmin: boolean
}
