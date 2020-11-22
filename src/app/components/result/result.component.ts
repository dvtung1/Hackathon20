import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PredictionService } from 'src/app/services/prediction.service';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  myClass = "";
  private predictionResultListener: Subscription
  label: string = "";
  confident_level: string = "0";
  constructor(private predictionService: PredictionService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ["Benefits", "Description", "Title", "Requirements", "Salary", "Location"];
  public pieChartData: SingleDataSet = [0, 0, 0, 0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];



  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ["Model feature importance"];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [7.22], label: 'Benefits' },
    { data: [44.5], label: 'Description' },
    { data: [10.65], label: 'Title' },
    { data: [27.5], label: 'Requirements' },
    { data: [0.48], label: 'Salary' },
    { data: [9.65], label: 'Location' },
  ];

  
  ngOnDestroy() {
    this.predictionResultListener.unsubscribe();
  }

  ngOnInit() {
    const dataSaved = this.predictionService.getData();
    if (dataSaved != null) {
      this.label = String(dataSaved["label"]);
      this.confident_level = String(dataSaved["confident_score"])
      const feature_importances_saved = dataSaved["feature_importance"];
      this.pieChartData = [feature_importances_saved["benefits"], feature_importances_saved["description"], feature_importances_saved["title"], feature_importances_saved["requirements"], feature_importances_saved["salary_range"], feature_importances_saved["location"]]
      this.myClass = this.label == "real" ? "badge-success bg-success" : "badge-danger bg-danger";
    }

    this.predictionResultListener = this.predictionService.getPredictionResultEmitter().subscribe(data => {
      this.label = String(data["label"]);
      this.confident_level = String(data["confident_score"])
      const feature_importances = data["feature_importance"];
      this.pieChartData = [feature_importances["benefits"], feature_importances["description"], feature_importances["title"], feature_importances["requirements"], feature_importances["salary_range"], feature_importances["location"]]
      this.myClass = this.label == "real" ? "badge-success bg-success" : "badge-danger bg-danger";

    })
  }
}

