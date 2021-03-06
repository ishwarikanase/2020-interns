import { Component, OnInit } from '@angular/core';
import { DataSService } from '../../services/data-s.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExchangeRatesAPIService } from '../../services/exchange-rates-api.service';

@Component({
  selector: 'app-forth',
  templateUrl: './forth.component.html',
  styleUrls: ['./forth.component.css']
})
export class ForthComponent implements OnInit {
  stepSize = 0.5;
  columnSize = 50;
  rowSize = 60;
  margin = 10;
  xAxis = [];
  canvas;
  Val_max;
  context;
  Val_min;
  sections;
  xScale;
  yScale;
  data = [];
  rates = [];
  values = [];
  keys = [];
  INR = [];
  GBP = [];
  latestData;
  curentRates;
  latestINR;
  latestGBP;
  currentDate = "2020-07-16";
  constructor(private exchange_rate_API_service: ExchangeRatesAPIService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.exchange_rate_API_service.getData().subscribe(data => {
      this.data = data;
      this.rates = this.data['rates'];
      for (let key in this.rates) {
        let splittedKey = key.split("-");
        if (splittedKey[1] === '01') {
          this.xAxis.push(key);
          this.values.push(this.rates[key]);
        }
      }
      this.INR = this.values.map(element => element.INR);
      this.GBP = this.values.map(element => element.GBP);
      this.init();
    });
    this.exchange_rate_API_service.getLatestData().subscribe(latestData => {
      this.latestData = latestData;
      this.curentRates = this.latestData['rates'];
      this.latestINR = this.curentRates['INR'];
      this.latestGBP = this.curentRates['GBP'];
      this.context.fillStyle = "#FF00FF";
      this.plotPoint(this.latestINR, "INR");
      this.context.fillStyle = "#FF0000";
      this.plotPoint(this.latestGBP, "GBP");
    });
  }

  init() {
    this.sections = 23;
    this.Val_max = 90;
    this.Val_min = -2;
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = "#0099ff"
    this.context.font = "20 pt Verdana"

    this.yScale = (this.canvas.height - this.columnSize - this.margin) / (this.Val_max - this.Val_min);
    this.xScale = (this.canvas.width - this.rowSize) / this.sections;

    this.context.strokeStyle = "#009933";
    this.context.beginPath();
    this.xAxis.push(this.currentDate);
    for (let i = 1; i < this.sections; i++) {
      var x = i * this.xScale;
      this.context.fillText(this.xAxis[i], x, this.columnSize - this.margin);
      this.context.moveTo(x, this.columnSize);
      this.context.lineTo(x, this.canvas.height - this.margin);
    }

    var count = 0;
    for (let scale = this.Val_max; scale >= this.Val_min; scale = scale - this.stepSize) {
      var y = this.columnSize + (this.yScale * count * this.stepSize);
      this.context.fillText(scale, this.margin, y + this.margin);
      this.context.moveTo(this.rowSize, y)
      this.context.lineTo(this.canvas.width, y)
      count++;
    }
    this.context.stroke();

    this.context.translate(this.rowSize, this.canvas.height + this.Val_min * this.yScale);
    this.context.scale(1, -1 * this.yScale);

    this.context.lineWidth = 0.2;
    this.context.strokeStyle = "#000";
    this.plotData(this.INR);
    this.context.lineWidth = 0.08;
    this.context.strokeStyle = "#00F";
    this.plotData(this.GBP);
  }

  plotData(dataSet) {
    this.context.beginPath();
    this.context.moveTo(0, dataSet[0]);
    for (let i = 1; i < this.sections; i++) {
      this.context.lineTo(i * this.xScale, dataSet[i]);
    }
    this.context.stroke();
  }
  plotPoint(dataSet, state) {
    this.context.fillRect(22 * this.xScale, dataSet, 10, 0.2);
    this.context.font = "2px Georgia";
    this.context.stroke();
  }

  next() {
    console.log("next");
  }
}
