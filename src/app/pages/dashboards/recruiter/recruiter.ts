import { Component } from '@angular/core';
import {Toast} from 'ngx-toastr';
import {ToastService} from '../../../@core/services/toast.service';
import {Integration} from '../../../@shared/services/integration';
import {Application} from '../../../@shared/services/application';
import {_MEE_APP_2, _MEE_REC_0, MEE_APP_2, MEE_REC_0} from '../../../@shared/models/input.module';
import {ApplicationResponse} from '../../../@shared/models/response.module';
import {RecruiterService} from '../../../@shared/services/recruiter';

@Component({
  selector: 'app-recruiter',
  standalone: false,
  templateUrl: './recruiter.html',
  styleUrl: './recruiter.css'
})
export class Recruiter {
  enabledApplications: ApplicationResponse[] = [];

  constructor(private toastService: ToastService,
              private integrationService: Integration,
              private applicationService: Application,
              private recruiterService: RecruiterService) {

  }


  ngOnInit() {
    this.getCompanyApplications()
    this.getCandidates()
  }

  getCompanyApplications() {
    let params: _MEE_APP_2 = {}
    this.applicationService.getEnabledCompanyApplications(params).subscribe((res) => {
      this.enabledApplications = res;
      console.log("Enabled Applications: ", this.enabledApplications);
      this.toastService.info("Applications retrieved successfully")
    })
  }

  getCandidates(){
    let params: _MEE_REC_0 = {
      paginate: 1,
      page: 1,
      limit: 10
    }
    this.recruiterService.getCandidateList(params).subscribe((res) => {
      console.log("Candidates: ", res);
    })
  }

}
