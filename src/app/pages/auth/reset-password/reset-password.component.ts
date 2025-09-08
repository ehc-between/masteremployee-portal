import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../@core/services/user.service";
import {USM_USR_14} from "../../../@shared/models/input.module";
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  imports: [
    TranslatePipe,
    ReactiveFormsModule
  ],
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  resetToken: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.resetForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    this.route.queryParams
      .subscribe(params => {
        this.resetToken = params['reset_token'];
      });
  }

  onSubmit() {
    if (this.resetForm.get('password')!.value === this.resetForm.get('confirmPassword')!.value) {
      let payload: USM_USR_14 = {
        reset_token: this.resetToken,
        new_password: this.resetForm.get('password')!.value
      }
      this.userService.setNewPassword(payload).subscribe((response) => {
        this.router.navigate(['/auth/login']);
      })
    }
  }
}
