import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { environment } from "src/environments/environment";
import { Subject } from 'rxjs';

const BACKEND_URL =  `${environment.apiUrl}/prediction`

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private data;
  private predictionResultEmitter = new Subject(); 
  constructor(private http: HttpClient) { }

  getPrediction(input) {
    // only if button "predict" is clicked (which means we are getting new data), we will delte the previous data
    this.data = null;
    this.http.post<{fake_confident_score: number, label: string}>(`${BACKEND_URL}/predict`, input).subscribe(data => {
        this.predictionResultEmitter.next(data);
        this.data = data;
    });
  }

  getPredictionResultEmitter() {
    return this.predictionResultEmitter.asObservable();
  }

  getData() {
    return this.data;
  }
}
