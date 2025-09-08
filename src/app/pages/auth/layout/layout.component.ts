import {Component, Input} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './layout.component.html',
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  @Input() imagePath? = ""
  @Input() header = ""
  @Input() description? = ""
  @Input() body? = ""
}
