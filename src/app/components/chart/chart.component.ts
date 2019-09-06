import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() chart: any = {};

  options = {
    responsive: true
  };

  colors: any[] = [
    {
      backgroundColor: 'rgba(66,165,245 ,0.5)', // 400
      borderColor: '#1976D2', // 700
      pointBackgroundColor: '#90CAF9', // 200
      pointBorderColor: '#1976D2', // 700
      pointHoverBackgroundColor: '#BBDEFB', // 100
      pointHoverBorderColor: '#0D47A1' // 900
    },
    {
      backgroundColor: 'rgba(102,187,106 ,0.5)', // 400
      borderColor: '#388E3C', // 700
      pointBackgroundColor: '#A5D6A7', // 200
      pointBorderColor: '#388E3C', // 700
      pointHoverBackgroundColor: '#C8E6C9', // 100
      pointHoverBorderColor: '#1B5E20' // 900
    },
    {
      backgroundColor: 'rgba(255,238,88 ,0.5)', // 400
      borderColor: '#FBC02D', // 700
      pointBackgroundColor: '#FFF59D', // 200
      pointBorderColor: '#FBC02D', // 700
      pointHoverBackgroundColor: '#FFF9C4', // 100
      pointHoverBorderColor: '#F57F17' // 900
    }
  ];

  constructor() {}

  ngOnInit() {}
}
