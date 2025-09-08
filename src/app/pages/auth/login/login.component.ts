import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../@core/services/auth.service";
import {StorageService} from "../../../@core/services/storage.service";
import {UserService} from "../../../@core/services/user.service";
import {AccessService} from "../../../@core/services/access.service";
import {Router} from "@angular/router";
import {TranslateModule, TranslatePipe, TranslateService} from "@ngx-translate/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {USM_USR_0} from "../../../@shared/models/input.module";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private userService: UserService,
    private accessService: AccessService,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required], updateOn: 'blur'}),
      password: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    });
  }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.isLoggedIn = true;
      }
    });

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    this.isLoginFailed = false;
    if (this.loginForm.invalid) {
      return;
    }
    const payload: USM_USR_0 = {
      email: this.loginForm.value.email.toString(),
      password: this.loginForm.value.password,
    }
    // Fix for undefined Accept-Locale header
    if (this.translateService.currentLang === undefined) {
      this.translateService.use('en');
    }
    this.authService
      .login(payload)
      .subscribe({
        next: () => {
          // Init user access data
          // this.accessService.init();
          // // Init user data
          // this.userService.init();
          // this.router.navigate(['dashboard']);
        },
        error: (error) => {
          if (error.status === 401) {
            this.isLoginFailed = true;
          }
        },
      });
  }

  passwordVisible: boolean = false;

  togglePasswordVisibility(inputId: string): void {
    this.passwordVisible = !this.passwordVisible;
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
  }


}
