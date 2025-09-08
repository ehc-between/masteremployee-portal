import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { UserService } from "../../../@core/services/user.service";
import { StorageService } from "../../../@core/services/storage.service";
import { AuthService } from "../../../@core/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { InvitationTokenVerificationResponse, LoginResponse } from "../../../@shared/models/response.module";
import { USM_USR_19 } from "../../../@shared/models/input.module";
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  imports: [
    ReactiveFormsModule,
    TranslatePipe
  ],
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  form: FormGroup;
  invitationToken: string;
  verificationStatusId: number = -1;
  registered = false;

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator // Custom Validator
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

    this.route.queryParams.subscribe(params => {
      this.form.patchValue({
        email: params['email'],
      });
      this.invitationToken = params['invitation_token'];
    });

    if (this.invitationToken) {
      this.authService.verifyInvitationToken(this.invitationToken).subscribe(
        (response: InvitationTokenVerificationResponse) => {
          this.verificationStatusId = response.status_id;
        }
      );
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const payload: USM_USR_19 = {
        invitation_token: this.invitationToken,
        password: this.form.get('password')!.value,
        email: this.form.get('email')!.value,
      };
      this.authService.registerUser(payload).subscribe(
        (response: LoginResponse) => {
          this.registered = true;
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          this.verificationStatusId = 3;
        }
      );
    }
  }

  // Custom Validator: Password Strength
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const password: string = control.value || '';

    if (!password) return null; // Don't validate if empty

    const hasNumber = /\d/.test(password); // Check for number
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Check for special character
    const validLength = password.length >= 8;

    if (!hasNumber || !hasSpecialChar || !validLength) {
      return { passwordStrength: true };
    }
    return null;
  }

  // Custom Validator: Confirm Password Match
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  togglePasswordVisibility(inputId: string): void {
    if (inputId === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (inputId === 'confirmPassword') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }

    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
  }
}
