import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from './pages/auth/layout/layout.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterUserComponent} from './pages/auth/register-user/register-user.component';
import {ForgotPassordComponent} from './pages/auth/forgot-passord/forgot-passord.component';
import {ResetPasswordComponent} from './pages/auth/reset-password/reset-password.component';
import {Recruiter} from './pages/dashboards/recruiter/recruiter';
import {Crm} from './pages/dashboards/crm/crm';
import {Api} from './pages/dashboards/api/api';
import {Toolbox} from './pages/dashboards/toolbox/toolbox';
import {CompanyAdministration} from './pages/dashboards/company-administration/company-administration';
import {User} from './pages/user/user';
import {AuthGuard} from './@core/guards/auth.guard';
import {CandidateList} from './pages/recruiter/candidate/candidate-list/candidate-list';
import {CandidateProfile} from './pages/recruiter/candidate/candidate-profile/candidate-profile';

const routes: Routes = [
  { path: '', redirectTo: 'dashboards/crm', pathMatch: 'full'},
  { path: 'auth', component: LayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register-user', component: RegisterUserComponent},
      { path: 'forgot-password', component: ForgotPassordComponent},
      { path: 'reset-password', component: ResetPasswordComponent}
    ]
  },
  {
    path: 'dashboards', children: [
      { path: 'recruiter', component: Recruiter, canActivate: [AuthGuard]},
      { path: 'crm', component: Crm, canActivate: [AuthGuard] },
      { path: 'api', component: Api, canActivate: [AuthGuard] },
      { path: 'toolbox', component: Toolbox, canActivate: [AuthGuard] },
      { path: 'company-administration', component: CompanyAdministration, canActivate: [AuthGuard] },
    ]
  },
  { path: 'user', component: User, canActivate: [AuthGuard] },
  { path: 'recruiter-candidates', component: CandidateList, canActivate: [AuthGuard] },
  { path: 'recruiter-candidates/view/:id', component: CandidateProfile, canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
