import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from './pages/auth/layout/layout.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterUserComponent} from './pages/auth/register-user/register-user.component';
import {ForgotPassordComponent} from './pages/auth/forgot-passord/forgot-passord.component';
import {ResetPasswordComponent} from './pages/auth/reset-password/reset-password.component';
import {Recruiter} from './pages/dashboards/recruiter/recruiter';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'auth', component: LayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register-user', component: RegisterUserComponent},
      { path: 'forgot-password', component: ForgotPassordComponent},
      { path: 'reset-password', component: ResetPasswordComponent}
    ]
  },
  {
    path: 'dashboards', children: [
      { path: 'recruiter', component: Recruiter },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
