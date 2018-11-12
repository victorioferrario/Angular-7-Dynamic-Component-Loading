import { Component, OnInit, HostBinding } from '@angular/core';
import { ScrollViewContext } from '../../../services/scroll-view.service';
@Component({
  selector: 'manx-scroll-nav',
  templateUrl: './scroll-nav.component.html',
  styleUrls: ['./scroll-nav.component.scss']
})
export class ScrollNavComponent implements OnInit {
  constructor(public scrollContext: ScrollViewContext) {}
  ngOnInit() {}
}
