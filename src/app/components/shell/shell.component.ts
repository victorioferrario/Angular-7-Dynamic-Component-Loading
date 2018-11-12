import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  styleUrls: ['./shell.component.scss'],
  template: `
    <app-header></app-header>
    <mat-drawer-container class="container">
      <mat-drawer mode="side" opened class="drawer"></mat-drawer>
      <mat-drawer-content class="content">
        <app-main><ng-content></ng-content></app-main
      ></mat-drawer-content>
    </mat-drawer-container>
  `
})
export class ShellComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
