import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import {Job} from "src/app/models/Job";
import { Subject } from 'rxjs';

const JOB_API = "https://github-jobs-proxy.appspot.com/positions"

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private recommendJob:Job[] = [];
  private recommendJobEmitter = new Subject<Job[]>();

  constructor(private http: HttpClient) { }


  findRecommendJob(userInput) {
    this.recommendJob = [];
    const url = `${JOB_API}?description=${userInput["title"]}&location=${userInput["location"]}`
    this.http.get<Job[]>(url).subscribe(res => {
      for (let jobData of res) {
        jobData.id = jobData.id.replace(/[0-9]/g, "");
        this.recommendJob.push(jobData);
      }
      this.recommendJobEmitter.next(this.recommendJob)
    })
  }

  getRecommendJob() {
    return this.recommendJob;
  }

  getRecommendJobEmitter() {
    return this.recommendJobEmitter.asObservable();
  }

}
