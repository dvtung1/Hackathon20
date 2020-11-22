import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GuardService } from 'src/app/services/guard.service';
import { PredictionService } from 'src/app/services/prediction.service';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-userinput',
  templateUrl: './userinput.component.html',
  styleUrls: ['./userinput.component.css']
})
export class UserinputComponent implements OnInit, OnDestroy {
  
  private predictionResultSubscription: Subscription
  label: string = "";
  constructor(private predictionService: PredictionService, private sharingService: SharingService, private router: Router, private guardService: GuardService) { }

  ngOnDestroy() {
    this.predictionResultSubscription.unsubscribe();
  }

  ngOnInit() {
    this.predictionResultSubscription = this.predictionService.getPredictionResultEmitter().subscribe(data => {
      this.label = data["label"];
    })
  }

  onSubmit(form: NgForm) {

    if (form.invalid){
      return;
    }
    // benefits, description, location, requirements, salary_range, title
    const benefits = form.value.benefits;
    const description = form.value.description;
    const location = form.value.location;
    const requirements = form.value.requirements;
    const salary_range = form.value.salary;
    const title = form.value.title;
    
    const data = {
      benefits, description, location, requirements, salary_range, title
    }

    this.predictionService.getPrediction(data);
    this.sharingService.findRecommendJob({
      benefits, description, location, requirements, salary_range, title
    })
    this.guardService.setPredictionStatus();
    this.router.navigate(["/result"]);
    // form.resetForm();
  }
}
