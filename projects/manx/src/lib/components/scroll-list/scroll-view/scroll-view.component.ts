import { Component, OnInit, HostBinding } from '@angular/core';
import { ScrollViewContext } from '../../../services/scroll-view.service';
@Component({
  selector: 'manx-scrollview',
  templateUrl: './scroll-view.component.html',
  styleUrls: ['./scroll-view.component.scss']
})
export class ScrollViewComponent implements OnInit {
  @HostBinding('style.width')
  viewWidth: string;
  @HostBinding('style.height.px')
  viewHeight: number;
  constructor(public scrollContext: ScrollViewContext) {}
  ngOnInit() {
    this.viewWidth = this.scrollContext.width.value;
    this.viewHeight = this.scrollContext.height.value;
    this.scrollContext.height.subscribe((data: any) => {
      console.log(data);
      this.viewHeight = data;
    });
  }
}
