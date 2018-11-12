import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  styles: [
    `
      .example-icon {
        padding: 0 14px;
      }

      .example-spacer {
        flex: 1 1 auto;
      }
      .highlight-text {
        color: #82b1ff;
      }
      .lowlight-text {
        color: #1565c0;
      }
      .me-header {
        background: #0d47a1;
      }
    `
  ],
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
