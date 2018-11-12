import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'manx-loader',
  template: `
    <ng-container>
      <article class="load-wrapper">
        <mat-spinner class="spacer-bottom"></mat-spinner>
      </article>
    </ng-container>
  `,
  styles: [
    `
      :host {
        box-sizing: border-box;
        display: block;
        clear: both;
        width: 100%;
        min-height: 125px;
        text-align: center;
        padding-top: 25px;
      }
      .load-wrapper {
        display: block;
        clear: both;
        width: 150px;
        margin: auto;
        margin-top: 150px;
      }
      .spacer-bottom {
        margin-bottom: 25px;
      }
      @media (max-width: 620px) {
        :host {
          min-width: 400px;
        }
      }
    `
  ]
})
export class DynamicLoaderComponent implements OnInit {
  constructor() {
    const self = this;
  }
  ngOnInit() {
    const self = this;
  }
}
