import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  public title: string;
  public progress: number;

  constructor() {
    this.title = 'Texto por defecto';
    this.progress = 0;
  }

  ngOnInit() {}
}
