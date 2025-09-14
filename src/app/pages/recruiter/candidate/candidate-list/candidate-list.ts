import { Component } from '@angular/core';
import {ToastService} from '../../../../@core/services/toast.service';
import {Integration} from '../../../../@shared/services/integration';
import {Application} from '../../../../@shared/services/application';
import {RecruiterService} from '../../../../@shared/services/recruiter';
import {CandidateCompactResponse, CandidateResponse} from '../../../../@shared/models/response.module';
import {_MEE_REC_0} from '../../../../@shared/models/input.module';

@Component({
  selector: 'app-candidate-list',
  standalone: false,
  templateUrl: './candidate-list.html',
  styleUrl: './candidate-list.css'
})
export class CandidateList {
  candidates: CandidateCompactResponse[] = [];
  page: number = 1;
  limit: number = 12;
  totalPages: number = 0;
  loading = false;

  constructor(private toastService: ToastService,
              private integrationService: Integration,
              private applicationService: Application,
              private recruiterService: RecruiterService) {

  }

  ngOnInit() {
    this.getCandidates()
  }


  getCandidates(){
    this.loading = true;
    let params: _MEE_REC_0 = {
      paginate: 1,
      page: this.page,
      limit: this.limit
    }
    this.recruiterService.getCandidateList(params).subscribe((res) => {
      this.candidates = res.data;
      this.totalPages = res.total_pages;
      this.loading = false
    })
  }


  goToPage(page: number){
    this.page = page
    this.getCandidates()
  }

}
