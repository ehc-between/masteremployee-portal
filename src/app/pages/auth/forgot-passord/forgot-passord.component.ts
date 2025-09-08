import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../@core/services/user.service";
import {USM_USR_13} from "../../../@shared/models/input.module";
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-passord',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './forgot-passord.component.html',
  styleUrl: './forgot-passord.component.css'
})
export class ForgotPassordComponent {
  resetForm: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      let payload: USM_USR_13 = {
        email: this.resetForm.get('email')!.value,
      }
      this.userService.initiatePasswordReset(payload).subscribe((response) => {

      });
    }
  }
}
