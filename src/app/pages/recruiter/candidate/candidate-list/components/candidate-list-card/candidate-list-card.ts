import {Component, Input} from '@angular/core';
import {CandidateCompactResponse, CandidateResponse} from '../../../../../../@shared/models/response.module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-candidate-list-card',
  standalone: false,
  templateUrl: './candidate-list-card.html',
  styleUrl: './candidate-list-card.css'
})
export class CandidateListCard {
  @Input() candidate: CandidateCompactResponse

  constructor(private router: Router) {

  }

  goToThread() {
    this.router.navigate(['/recruiter-candidates/view/', this.candidate.candidate_id]);
  }

}
