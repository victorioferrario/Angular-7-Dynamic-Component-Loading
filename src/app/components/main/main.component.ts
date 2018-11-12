import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-main',
  styleUrls: ['main.component.scss'],
  template: `
    <manx-scrollview
      class="k-widget k-scrollview-wrap mat-elevation-z2"
    ></manx-scrollview>
  `
})
export class MainComponent implements OnInit, AfterViewInit {
  constructor() {}
  ngOnInit() {}
  ngAfterViewInit() {}
}
