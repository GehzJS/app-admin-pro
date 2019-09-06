import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styles: []
})
export class GraphicsComponent implements OnInit {
  data: any[] = [];
  charts: any = {
    chart1: {
      labels: ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      data: [24, 30, 46],
      type: 'doughnut',
      legend: 'El pan se come con'
    },
    chart2: {
      labels: ['Hombres', 'Mujeres'],
      data: [4500, 6000],
      type: 'doughnut',
      legend: 'Entrevistados'
    },
    chart3: {
      labels: ['Si', 'No'],
      data: [95, 5],
      type: 'doughnut',
      legend: '¿Le dan gases los frijoles?'
    },
    chart4: {
      labels: ['No', 'Si'],
      data: [85, 15],
      type: 'doughnut',
      legend: '¿Le importa que le den gases?'
    }
  };

  constructor() {
    this.data = Object.values(this.charts); // Se convierte el objeto en un arreglo.
  }

  ngOnInit() {}
}
