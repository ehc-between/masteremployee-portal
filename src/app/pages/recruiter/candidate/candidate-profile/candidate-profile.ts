import { Component } from '@angular/core';
import {ToastService} from '../../../../@core/services/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {_MEE_REC_1, MEE_REC_1} from '../../../../@shared/models/input.module';
import {RecruiterService} from '../../../../@shared/services/recruiter';
import {CandidateResponse} from '../../../../@shared/models/response.module';

@Component({
  selector: 'app-candidate-profile',
  standalone: false,
  templateUrl: './candidate-profile.html',
  styleUrl: './candidate-profile.css'
})
export class CandidateProfile {
  candidateId: string
  candidate: CandidateResponse
  selectedTab = 'overview';

  constructor(private toastService: ToastService,
              private router: Router,
              private route: ActivatedRoute,
              private recruiterService: RecruiterService) {
  }

  ngOnInit() {
    this.candidateId = String(this.route.snapshot.paramMap.get('id'));
    this.getCandidateDetails()
  }

  getCandidateDetails(){
    let params: _MEE_REC_1 = {
      candidate_id: this.candidateId
    }
    this.recruiterService.getCandidateDetails(params).subscribe((res) => {
      this.candidate = res;
    })
  }

  colorPairs = [
    'bg-dark text-inverse-dark',
    'bg-warning text-inverse-warning',
    'bg-primary text-inverse-primary',
    'bg-info text-inverse-info',
    'bg-success text-inverse-success',
    'bg-danger text-inverse-danger'
  ];
}
