import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharingService } from 'src/app/services/sharing.service';
import {Job} from "src/app/models/Job"
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recommendjob',
  templateUrl: './recommendjob.component.html',
  styleUrls: ['./recommendjob.component.css']
})
export class RecommendjobComponent implements OnInit, OnDestroy {

  recommendJob: Job[] = [];
  private recommendJobSubscription: Subscription;
  
  constructor(private sharingService: SharingService) { }

  ngOnInit() {
    this.recommendJob = this.sharingService.getRecommendJob();

    this.recommendJobSubscription = this.sharingService.getRecommendJobEmitter().subscribe(recommendJobArray => {
      this.recommendJob = recommendJobArray;
    })
  }

  ngOnDestroy() {
    this.recommendJobSubscription.unsubscribe();
  }
}
